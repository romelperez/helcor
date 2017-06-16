const serialAsync = require('./index');

function makeTask (delay = 100, fails = false) {
  return sinon.stub().callsFake(() => {
    return new Promise((res, rej) => setTimeout(() => fails ? rej() : res(), delay));
  });
}

describe('serialAsync()', function () {

  it('It is a function', function () {
    expect(serialAsync).to.be.a('function');
  });

  it('It requires a valid identifier and a valid function', function () {
    expect(function () { serialAsync(); }).to.throw();
    expect(function () { serialAsync(true); }).to.throw();
    expect(function () { serialAsync(10); }).to.throw();
    expect(function () { serialAsync('name'); }).to.throw();
    expect(function () { serialAsync('name', function () {}); }).to.not.throw();
  });

  it('Many concurrent calls on task will be stacked and will be called in serial', function (done) {

    const s1 = makeTask(100);
    const s2 = makeTask(100);
    const s3 = makeTask(100);

    serialAsync('abc', s1);
    serialAsync('abc', s2);
    serialAsync('abc', s3);

    setTimeout(function () {
      expect(s1, 's1 first').to.have.been.calledOnce;
      expect(s2, 's2 first').to.have.not.been.called;
      expect(s3, 's3 first').to.have.not.been.called;
    }, 10);

    setTimeout(function () {
      expect(s1, 's1 second').to.have.been.calledOnce;
      expect(s2, 's2 second').to.have.been.calledOnce;
      expect(s3, 's3 second').to.have.not.been.called;
    }, 110);

    setTimeout(function () {
      expect(s1, 's1 third').to.have.been.calledOnce;
      expect(s2, 's2 third').to.have.been.calledOnce;
      expect(s3, 's3 third').to.have.been.calledOnce;
    }, 210);

    setTimeout(done, 300);
  });

  it('Many concurrent calls on many tasks will work indepently', function (done) {

    const t1s1 = makeTask(100);
    const t1s2 = makeTask(100);

    const t2s1 = makeTask(100);
    const t2s2 = makeTask(100);

    serialAsync('task1', t1s1);
    serialAsync('task1', t1s2);

    serialAsync('task2', t2s1);
    serialAsync('task2', t2s2);

    setTimeout(function () {
      expect(t1s1, 't1s1 first').to.have.been.calledOnce;
      expect(t1s2, 't1s2 first').to.have.not.been.called;

      expect(t2s1, 't2s1 first').to.have.been.calledOnce;
      expect(t2s2, 't2s2 first').to.have.not.been.called;
    }, 10);

    setTimeout(function () {
      expect(t1s1, 't1s1 second').to.have.been.calledOnce;
      expect(t1s2, 't1s2 second').to.have.been.calledOnce;

      expect(t2s1, 't2s1 second').to.have.been.calledOnce;
      expect(t2s2, 't2s2 second').to.have.been.calledOnce;
    }, 110);

    setTimeout(function () {
      expect(t1s1, 't1s1 third').to.have.been.calledOnce;
      expect(t1s2, 't1s2 third').to.have.been.calledOnce;

      expect(t2s1, 't2s1 third').to.have.been.calledOnce;
      expect(t2s2, 't2s2 third').to.have.been.calledOnce;
    }, 210);

    setTimeout(done, 300);
  });

  it('Calls which not return a promise works the same way', function (done) {
    const task1 = sinon.spy();
    const task2 = sinon.spy();

    serialAsync('mytask', task1);
    serialAsync('mytask', task2);

    setTimeout(function () {
      expect(task1).to.have.been.calledOnce;
      expect(task2).to.have.been.calledOnce;
    }, 0);

    setTimeout(done, 1);
  });

  it('If calls return rejected promises, works the same way', function (done) {
    const task1 = makeTask(100, true);
    const task2 = makeTask(100, true);

    serialAsync('mytask', task1);
    serialAsync('mytask', task2);

    setTimeout(function () {
      expect(task1).to.have.been.calledOnce;
      expect(task2).to.have.not.been.called;
    }, 10);

    setTimeout(function () {
      expect(task1).to.have.been.calledOnce;
      expect(task2).to.have.been.calledOnce;
    }, 110);

    setTimeout(done, 1);
  });

});

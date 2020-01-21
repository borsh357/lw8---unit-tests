/* jshint ignore:start */
mocha.setup('bdd');
var assert = chai.assert;
var expect = chai.expect;

describe('replaceString', function() {
  it('Возвращает строку, в которой все искомые подстроки заменены на новую подстроку', () => {
    assert.deepEqual(replaceString('Hello world!', 'world', 'people'), 'hello people!');
    assert.deepEqual(replaceString('Hello world!', 'o', ''), 'hell wrld!');
    assert.deepEqual(replaceString('Hello world!', ' ', ''), 'helloworld!');
  });
  it('Возвращает false при неверно переданных аргументах', () => {
    assert.deepEqual(replaceString('Hello world!', '', ''), false);
    assert.deepEqual(replaceString('Hello world!', 'hello'), false);
    assert.deepEqual(replaceString('Hello world!', 'he', 1), false);
    assert.deepEqual(replaceString('Hello world!', 'hell', [1, 2, 3]), false);
    assert.deepEqual(replaceString('Hello world!', 'hello', ['wo', 'r', 'ld']), false);
  });
})

describe('isArrayEqual', function() {
  it('Сравнивает два произвольных массива и возвращает true, если массивы равны', () => {
    assert.deepEqual(isArrayEqual([1, 2, 3], [1, 2, 3]), true);
    assert.deepEqual(isArrayEqual([1, 2, null], [1, 2, null]), true);
    assert.deepEqual(isArrayEqual([1, 2, false], [1, 2, false]), true);
    assert.deepEqual(isArrayEqual([1, 'abc', undefined], [1, 'abc', undefined]), true);
  });
  it('Возвращает false, если массивы не равны', () => {
    assert.deepEqual(isArrayEqual([3], [1, 2, 3]), false);
    assert.deepEqual(isArrayEqual([null, null, null], [1, 2, null]), false);
    assert.deepEqual(isArrayEqual([NaN, 2, false], [1, 2, true]), false);
    assert.deepEqual(isArrayEqual([1, 'abc', undefined], [1, 'Hellowrld!', undefined]),
      false);
  });
})

describe('flatArray', function() {
  it(
    'Принимает массив чисел, если в нем также содержатся массивы с числами, "разворачивает" их и возвращает массив с числами',
    () => {
      assert.deepEqual(flatArray([]), []);
      assert.deepEqual(flatArray(Array()), []);
      assert.deepEqual(flatArray([1, 2]), [1, 2]);
      assert.deepEqual(flatArray([1, [2, 3]]), [1, 2, 3]);
      assert.deepEqual(flatArray([1, [2, 3], 40, [80, 160], 999]), [1, 2, 3, 40, 80, 160, 999]);
    });
  it('Возвращает false, если на вход получены неправильные значения', () => {
    assert.deepEqual(flatArray(1), false);
    assert.deepEqual(flatArray('abc'), false);
    assert.deepEqual(flatArray({ 1: 1, 2: 2, 3: 3 }), false);
    assert.deepEqual(flatArray(null), false);
    assert.deepEqual(flatArray(undefined), false);
    assert.deepEqual(flatArray(), false);
  });
})

describe('isTimeRangesIntersect', function() {
  it('Возвращает true, если временные диапазоны пересекаются', () => {
    assert.deepEqual(isTimeRangesIntersect(['07:00', '08:01'], ['08:00', '09:00']), true);
    assert.deepEqual(isTimeRangesIntersect(['08:00', '09:00'], ['07:00', '08:30']), true);
  });
  it(
    'Возвращает false, если временные диапазоны не пересекаются или переданы неверные значения',
    () => {
      assert.deepEqual(isTimeRangesIntersect(['08:00', '09:00'], ['07:00', '08:00']), false);
      assert.deepEqual(isTimeRangesIntersect(['08:00', '09:00'], ['07:00', '08:00']), false);
      assert.deepEqual(isTimeRangesIntersect(['08:00'], ['07:00', '09:00']), false);
      assert.deepEqual(isTimeRangesIntersect(1, ['07:00', '08:00']), false);
      assert.deepEqual(isTimeRangesIntersect(undefined, undefined), false);
      assert.deepEqual(isTimeRangesIntersect(), false);
    });
})

describe('check', function() {
  it('Проверяет данные data на соответствие типу expectedType', () => {
    assert.deepEqual(check([1, 2], 'array'), true);
    assert.deepEqual(check('Hello, world', 'string'), true);
    assert.deepEqual(check(1, 'number'), true);
    assert.deepEqual(check(Number(), 'number'), true);
    assert.deepEqual(check({ 1: 'a' }, 'object'), true);
    assert.deepEqual(check(NaN, 'number'), true);
    assert.deepEqual(check(null, 'null'), true);
  });
  it(
    'Возвращает false, если data не соответствует expectedType или переданы неверные аргументы',
    () => {
      assert.deepEqual(check([1, 2], 'number'), false);
      assert.deepEqual(check('Hello, world', 'array'), false);
      assert.deepEqual(check(1, 'object'), false);
      assert.deepEqual(check(Number(), 'undefined'), false);
      assert.deepEqual(check({ 1: 'a' }, 'string'), false);
      assert.deepEqual(check(1, ''), false);
      assert.deepEqual(check(1), false);
      assert.deepEqual(check(), false);
    });
})

describe('Player', function() {
  describe('player.display()', function() {
    it('Отображает текущее состояние объекта', () => {
      assert.deepEqual(Player.display(), 'Track: ' + Player.currentTrack + ' Status: ' +
        Player.status);
    });
  });
  describe('player.play()', function() {
    it('Меняет статус проигрывателя на play', () => {
      assert.deepEqual(Player.play(), assert.propertyVal(Player, 'status', 'play'))
    });
  });
  describe('player.pause()', function() {
    it('Меняет статус проигрывателя на pause', () => {
      assert.deepEqual(Player.pause(), assert.propertyVal(Player, 'status', 'pause'))
    });
  });
  describe('player.next()', function() {
    it('Переключает на следующий трек', () => {
      var testCurrentTrack = Player.currentTrack;
      expect(Player.next(), assert.propertyVal(Player, 'currentTrack', tracks[tracks.indexOf(
        testCurrentTrack) + 1]))
    });
  });
  describe('player.prev()', function() {
    var testCurrentTrack = Player.currentTrack;
    it('Переключает на пердыдущий трек', () => {
      expect(Player.prev(), assert.propertyVal(Player, 'currentTrack', tracks[tracks.indexOf(
        testCurrentTrack) - 1]))
    });
  });
});


describe('Cashbox', function() {
  describe('cashbox.open(incomingCash)', function() {
    it('Принимает аргумент в качестве amount кассы', () => {
      assert.deepEqual(cashbox.open(1), assert.propertyVal(cashbox, 'amount', 1),
        assert.propertyVal(cashbox, 'status', 'opened'));
    });
    console.log(cashbox.status);
    it(
      'Возвращает false, если incomingCash меньше нуля или не является числом, если касса уже открыта',
      () => {
        assert.deepEqual(cashbox.open(-1), false);
        assert.deepEqual(cashbox.open(NaN), false);
        assert.deepEqual(cashbox.open(Infinity), false);
        assert.deepEqual(cashbox.open('1'), false);
        assert.deepEqual(cashbox.open([1]), false);
        assert.deepEqual(cashbox.open({ amount: 1 }), false);
        assert.deepEqual(cashbox.open(), false);
        if (cashbox.status === 'opened') {
          assert.deepEqual(cashbox.open(100), false);
        }
      });
  });

  describe('cashbox.addPayment()', function() {
    it('Добавляет payment в history, изменят amount cashbox\'a', () => {
      var testCashboxAmount = cashbox.amount;
      var testIndexOfPayment;
      assert.deepEqual(
        cashbox.addPayment({ amount: 10, info: 'True Payment' }),
        assert.propertyVal(cashbox, 'amount', testCashboxAmount + 10),
        testIndexOfPayment = cashbox.history.length - 1,
        expect(cashbox.history[testIndexOfPayment].info).to.be.deep.equal(
          'True Payment'),
        expect(cashbox.history[testIndexOfPayment].amount).to.be.deep.equal(10),
        expect(cashbox.history[testIndexOfPayment]).to.have.property('time'),
        expect(assert.propertyVal(cashbox, 'status', 'opened'))
      );
    });
    it(
      'Возвращает false, если payment.ammount меньше или равно нулю, если переданы значения неверного типа, аргументы отсутствуют, или касса закрыта',
      () => {
        assert.deepEqual(cashbox.addPayment({ amount: 0, info: 'payment.amount = 0' }),
          false);
        assert.deepEqual(cashbox.addPayment({ amount: '100', info: 'Not a number' }),
          false);
        assert.deepEqual(cashbox.addPayment({ amount: [100], info: 'Not a number' }),
          false);
        assert.deepEqual(cashbox.addPayment({ amount: {}, info: 'Not a number' }),
          false);
        assert.deepEqual(cashbox.addPayment({ info: 'amount is missing' }),
          false);
        assert.deepEqual(cashbox.addPayment({ amount: 100 }),
          false);
        assert.deepEqual(cashbox.addPayment(NaN, 'not an object at all'),
          false);
        if (cashbox.status === 'closed') {
          assert.deepEqual(cashbox.addPayment({ amount: 10, info: 'payment.amount = 0' }),
            false);
        }
      });
  });

  describe('cashbox.refundPayment()', function() {
    it('Добавляет refund в history, изменят amount cashbox\'a', () => {
      var testCashboxAmount = cashbox.amount;
      var testIndexOfPayment;
      assert.deepEqual(
        cashbox.refundPayment({ amount: 5, info: 'True Refund' }),
        assert.propertyVal(cashbox, 'amount', testCashboxAmount - 5),
        testIndexOfPayment = cashbox.history.length - 1,
        expect(cashbox.history[testIndexOfPayment].info).to.be.deep.equal(
          'True Refund'),
        expect(cashbox.history[testIndexOfPayment].amount).to.be.deep.equal(5),
        expect(cashbox.history[testIndexOfPayment]).to.have.property('time'),
        expect(assert.propertyVal(cashbox, 'status', 'opened'))
      );
    });
    it(
      'Возвращает false, если refund.ammount меньше или равно нулю или больше refund.ammount, если переданы значения неверного типа, или если аргументы отсутствуют',
      () => {
        assert.deepEqual(cashbox.refundPayment({ amount: 0, info: 'refund.amount = 0' }),
          false);
        assert.deepEqual(cashbox.refundPayment({ amount: 100, info: 'cashbox.amount < 100' }),
          false);
        assert.deepEqual(cashbox.refundPayment({ amount: '100', info: 'Not a number' }),
          false);
        assert.deepEqual(cashbox.refundPayment({ amount: [100], info: 'Not a number' }),
          false);
        assert.deepEqual(cashbox.refundPayment({ amount: {}, info: 'Not a number' }),
          false);
        assert.deepEqual(cashbox.refundPayment({ info: 'amount is missing' }),
          false);
        assert.deepEqual(cashbox.refundPayment({ amount: 100 }),
          false);
        assert.deepEqual(cashbox.refundPayment(NaN, 'Not an bject at all'),
          false);
        if (cashbox.status === 'closed') {
          assert.deepEqual(cashbox.addPayment({ amount: 10, info: 'payment.amount = 0' }),
            false);
        }
      });
  });
});

mocha.run();
/* jshint ignore:end */
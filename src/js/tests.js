/* jshint ignore:start */
mocha.setup('bdd');
var assert = chai.assert;
var expect = chai.expect;

describe(
  'replaceString - Возвращает строку, в которой все искомые подстроки заменены на новую подстроку',
  function() {
    it('Возвращает корректную строку', () => {
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
      assert.deepEqual(replaceString({}, 'hello', ['wo', 'r', 'ld']), false);
    });
  })

//isArrayEqual
describe('isArrayEqual - Сравнивает два произвольных массива', function() {
  it('Возвращает true, если массивы равны', () => {
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
  it('Возвращает false, если переданы неверные значения(не массивы)', () => {
    assert.deepEqual(isArrayEqual('false arguments'), false);
  });
})

//flatArray
describe(
  'flatArray - Принимает массив чисел, если в нем также содержатся массивы с числами, "разворачивает" их',
  function() {
    it('Возвращает массив с числами', () => {
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
    it(
      'Игнорирует глубину вложенности массивов более 1 (Напр: [1,[2,[3],4],5] - [3] проигнорируется)',
      () => {
        assert.deepEqual(flatArray([1, [2, [3], 4], 5]), [1, 2, 4, 5]);
      });
  })

//isTimeRangesIntersect
describe('isTimeRangesIntersect', function() {
    it('Возвращает true, если временные диапазоны пересекаются', () => {
      assert.deepEqual(isTimeRangesIntersect(['07:00', '08:01'], ['08:00', '09:00']), true);
      assert.deepEqual(isTimeRangesIntersect(['08:00', '09:00'], ['07:00', '08:30']), true);
    });
    it('Возвращает true, если временные диапазоны одинаковы (а значит пересекаются)', () => {
      assert.deepEqual(isTimeRangesIntersect(['08:00', '09:00'], ['08:00', '09:00']), true);
      assert.deepEqual(isTimeRangesIntersect(['00:00', '00:00'], ['00:00', '00:00']), true);
    });
    it('Возвращает false, если временные диапазоны не пересекаются', () => {
      assert.deepEqual(isTimeRangesIntersect(['08:00', '09:00'], ['07:00', '08:00']), false);
      assert.deepEqual(isTimeRangesIntersect(['08:00', '09:00'], ['07:00', '08:00']), false);
    });
    it('Возвращает false, если переданы неверные значения', () => {
      assert.deepEqual(isTimeRangesIntersect(['08:00'], ['07:00', '09:00']), false);
      assert.deepEqual(isTimeRangesIntersect(1, ['07:00', '08:00']), false);
      assert.deepEqual(isTimeRangesIntersect(undefined, undefined), false);
      assert.deepEqual(isTimeRangesIntersect(), false);
    });
  })
  //check
describe('check - Проверяет данные data на соответствие типу expectedType', function() {
  it('Array', () => {
    assert.deepEqual(check([1, 2], 'array'), true);
  });
  it('String', () => {
    assert.deepEqual(check('Hello, world', 'string'), true);
  });
  it('Object', () => {
    assert.deepEqual(check({ 1: 'a' }, 'object'), true);
  });
  it('Null', () => {
    assert.deepEqual(check(null, 'null'), true);
  });
  it('Number', () => {
    assert.deepEqual(check(1, 'number'), true);
    assert.deepEqual(check(Number(), 'number'), true);
    assert.deepEqual(check(NaN, 'number'), true);
  });
  it('Возвращает false, если data не соответствует expectedType', () => {
    assert.deepEqual(check([1, 2], 'number'), false);
    assert.deepEqual(check('Hello, world', 'array'), false);
    assert.deepEqual(check(1, 'object'), false);
    assert.deepEqual(check(Number(), 'undefined'), false);
    assert.deepEqual(check({ 1: 'a' }, 'string'), false);
  });
  it('Возвращает false, если переданы неверные аргументы', () => {
    assert.deepEqual(check(1, ''), false);
    assert.deepEqual(check(1), false);
    assert.deepEqual(check(), false);
  });
})

//player
describe('Player', function() {
  it('Принимает аргумент в качестве треклиста (отсутствие аргумента = пустой треклист)', () => {
    assert.doesNotThrow(() => {
      var testPlayer = new Player(['song1.mp3', 'song2.mp3', 'song3.mp3']);
      assert.deepEqual(testPlayer.tracks, ['song1.mp3', 'song2.mp3', 'song3.mp3']);
      testPlayer = new Player();
      assert.deepEqual(testPlayer.tracks, []);
    });
  });
  it(
    'Плеер не содается, если в качестве треклиста переданы не валидные значения (не массив строк)',
    () => {
      assert.throws(() => {
        var testPlayer = new Player(1, 'song', undefined);
      });
    });
  describe('player.display()', function() {
    it('При наличии треков отображает текущее состояние плеера', () => {
      var testPlayer1 = new Player(['song1.mp3']);
      assert.deepEqual(testPlayer1.display(), 'Track: song1.mp3 Status: pause');
    });
    it('Отображает пустой треклист', () => {
      var testPlayer2 = new Player();
      assert.deepEqual(testPlayer2.display(), 'Tracklist empty');
    });
  });
  describe('player.play()', function() {
    it('Меняет статус проигрывателя на play', () => {
      var testPlayer = new Player(['song1.mp3']);
      assert.deepEqual(testPlayer.status, 'pause');
      assert.deepEqual(testPlayer.play(), assert.propertyVal(testPlayer, 'status',
        'play'));
      assert.deepEqual(testPlayer.display(), 'Track: song1.mp3 Status: play');
    });
    it('Не меняет статус проигрывателя, если треклист пуст', () => {
      var testPlayer = new Player();
      assert.deepEqual(testPlayer.status, 'pause');
      assert.deepEqual(testPlayer.play(), assert.propertyVal(testPlayer, 'status',
        'pause'));
      assert.deepEqual(testPlayer.display(), 'Tracklist empty');
    });
  });
  describe('player.pause()', function() {
    it('Меняет статус проигрывателя на pause', () => {
      var testPlayer = new Player(['song1.mp3']);
      assert.deepEqual(testPlayer.status, 'pause');
      testPlayer.play();
      assert.deepEqual(testPlayer.status, 'play');
      assert.deepEqual(testPlayer.pause(), assert.propertyVal(testPlayer, 'status',
        'pause'));
      assert.deepEqual(testPlayer.display(), 'Track: song1.mp3 Status: pause');
    });
  });
  describe('player.next()', function() {
    it('Переключает на следующий трек', () => {
      var testPlayer = new Player(['song1.mp3', 'song2.mp3', 'song3.mp3']);
      assert.propertyVal(testPlayer, 'currentTrack', 'song1.mp3');
      expect(testPlayer.next(), assert.propertyVal(testPlayer, 'currentTrack',
        'song2.mp3'));
      assert.deepEqual(testPlayer.display(), 'Track: song2.mp3 Status: pause');
    });
    it('Переключает на первый трек при достижении конца треклиста (loop)', () => {
      var testPlayer = new Player(['song1.mp3', 'song2.mp3', 'song3.mp3']);
      assert.propertyVal(testPlayer, 'currentTrack', 'song1.mp3');
      testPlayer.next();
      testPlayer.next();
      assert.propertyVal(testPlayer, 'currentTrack', 'song3.mp3');
      expect(testPlayer.next(), assert.propertyVal(testPlayer, 'currentTrack',
        'song1.mp3'));
      assert.deepEqual(testPlayer.display(), 'Track: song1.mp3 Status: pause');
    });
    it('Не делает ничего при пустом треклисте', () => {
      var testPlayer = new Player();
      expect(testPlayer.next(), assert.propertyVal(testPlayer, 'currentTrack',
        undefined));
      assert.deepEqual(testPlayer.display(), 'Tracklist empty');
    });
  });
  describe('player.prev()', function() {
    it('Переключает на предыдущий трек', () => {
      var testPlayer = new Player(['song1.mp3', 'song2.mp3', 'song3.mp3']);
      assert.propertyVal(testPlayer, 'currentTrack', 'song1.mp3');
      testPlayer.next();
      assert.propertyVal(testPlayer, 'currentTrack', 'song2.mp3');
      expect(testPlayer.prev(), assert.propertyVal(testPlayer, 'currentTrack',
        'song1.mp3'));
      assert.deepEqual(testPlayer.display(), 'Track: song1.mp3 Status: pause');
    });
    it('Переключает на последний трек при достижении начала треклиста (loop)', () => {
      var testPlayer = new Player(['song1.mp3', 'song2.mp3', 'song3.mp3']);
      assert.propertyVal(testPlayer, 'currentTrack', 'song1.mp3');
      expect(testPlayer.prev(), assert.propertyVal(testPlayer, 'currentTrack',
        'song3.mp3'));
      assert.deepEqual(testPlayer.display(), 'Track: song3.mp3 Status: pause');
    });
    it('Не делает ничего при пустом треклисте', () => {
      var testPlayer = new Player();
      expect(testPlayer.prev(), assert.propertyVal(testPlayer, 'currentTrack',
        undefined));
      assert.deepEqual(testPlayer.display(), 'Tracklist empty');
    });
  });
});


describe('Cashbox - Объект кассы', function() {
  describe(
    'cashbox.open(incomingCash) - Принимает аргумент в качестве amount кассы и открывает ее',
    function() {
      it('Касса открылась, amount изменился', () => {
        var testCashbox = new Cashbox();
        assert.propertyVal(testCashbox, 'status', 'closed');
        assert.deepEqual(testCashbox.open(1), assert.propertyVal(testCashbox, 'amount', 1),
          assert.propertyVal(testCashbox, 'status', 'opened'));
      });
      it('Возвращает false, если incomingCash меньше нуля', () => {
        var testCashbox = new Cashbox();
        assert.deepEqual(testCashbox.open(-1), false);
        assert.propertyVal(testCashbox, 'status', 'closed');
      });
      it('Возвращает false, если incomingCash не является числом', () => {
        var testCashbox = new Cashbox();
        assert.deepEqual(testCashbox.open(NaN), false);
        assert.deepEqual(testCashbox.open(Infinity), false);
        assert.deepEqual(testCashbox.open('1'), false);
        assert.deepEqual(testCashbox.open([1]), false);
        assert.deepEqual(testCashbox.open({ amount: 1 }), false);
        assert.deepEqual(testCashbox.open(), false);
        assert.propertyVal(testCashbox, 'status', 'closed');
      });
      it('Возвращает false, если касса уже открыта', () => {
        var testCashbox = new Cashbox();
        assert.propertyVal(testCashbox, 'status', 'closed');
        testCashbox.open(100);
        assert.deepEqual(testCashbox.open(100), false);
        assert.propertyVal(testCashbox, 'status', 'opened');
      });
    });

  describe('cashbox.addPayment() - Добавляет payment в history, изменяет amount cashbox\'a',
    function() {
      it('Payment добавлен в history, amount изменился', () => {
        var testCashbox = new Cashbox();
        testCashbox.open(0);
        assert.deepEqual(
          testCashbox.addPayment({ amount: 10, info: 'True Payment' }),
          assert.propertyVal(testCashbox, 'amount', 10),
          expect(testCashbox.history[0].info).to.be.deep.equal(
            'True Payment'),
          expect(testCashbox.history[0].amount).to.be.deep.equal(10),
          expect(testCashbox.history[0]).to.have.property('time'),
          expect(assert.propertyVal(testCashbox, 'status', 'opened'))
        );
      });
      it('Возвращает false, если payment.ammount меньше или равно нулю', () => {
        var testCashbox = new Cashbox();
        testCashbox.open(0);
        assert.deepEqual(testCashbox.addPayment({ amount: 0, info: 'payment.amount = 0' }),
          false);
        assert.deepEqual(testCashbox.addPayment({ amount: -100, info: 'payment.amount < 0' }),
          false);
        expect(testCashbox.history).to.be.empty;
      });
      it('Возвращает false, если переданы значения неверного типа (не объект)', () => {
        var testCashbox = new Cashbox();
        assert.deepEqual(testCashbox.addPayment({ amount: '100', info: 'Not a number' }),
          false);
        assert.deepEqual(testCashbox.addPayment({ amount: [100], info: 'Not a number' }),
          false);
        assert.deepEqual(testCashbox.addPayment({ amount: {}, info: 'Not a number' }),
          false);
        assert.deepEqual(testCashbox.addPayment({ info: 'amount is missing' }),
          false);
        assert.deepEqual(testCashbox.addPayment({ amount: 100 }),
          false);
        assert.deepEqual(testCashbox.addPayment(NaN, 'not an object at all'),
          false);
        expect(testCashbox.history).to.be.empty;
      });
      it('Возвращает false, если касса закрыта', () => {
        var testCashbox = new Cashbox();
        assert.deepEqual(testCashbox.addPayment({ amount: 10, info: 'cashbox closed' }),
          false);
      });
    });

  describe('cashbox.refundPayment() - Добавляет refund в history, изменят amount cashbox\'a',
    function() {
      it('Refund добавлен в history, amount изменился', () => {
        var testCashbox = new Cashbox();
        testCashbox.open(15);
        assert.deepEqual(
          testCashbox.refundPayment({ amount: 5, info: 'True Refund' }),
          assert.propertyVal(testCashbox, 'amount', 10),
          expect(testCashbox.history[0].info).to.be.deep.equal(
            'True Refund'),
          expect(testCashbox.history[0].amount).to.be.deep.equal(5),
          expect(testCashbox.history[0]).to.have.property('time'),
          expect(assert.propertyVal(testCashbox, 'status', 'opened'))
        );
      });
      it('Возвращает false, если refund.ammount меньше или равно нулю', () => {
        var testCashbox = new Cashbox();
        testCashbox.open(15);
        assert.deepEqual(testCashbox.refundPayment({ amount: 0, info: 'refund.amount = 0' }),
          false);
        assert.deepEqual(testCashbox.refundPayment({ amount: -100, info: 'refund.amount = 0' }),
          false);
      });
      it('Возвращает false, если переданы значения неверного типа (не объект)', () => {
        var testCashbox = new Cashbox();
        testCashbox.open(15);
        assert.deepEqual(testCashbox.refundPayment({ amount: 100, info: 'cashbox.amount < 100' }),
          false);
        assert.deepEqual(testCashbox.refundPayment({ amount: '100', info: 'Not a number' }),
          false);
        assert.deepEqual(testCashbox.refundPayment({ amount: [100], info: 'Not a number' }),
          false);
        assert.deepEqual(testCashbox.refundPayment({ amount: {}, info: 'Not a number' }),
          false);
        assert.deepEqual(testCashbox.refundPayment({ info: 'amount is missing' }),
          false);
        assert.deepEqual(testCashbox.refundPayment({ amount: 100 }),
          false);
        assert.deepEqual(testCashbox.refundPayment(NaN, 'Not an bject at all'),
          false);
      });
      it('Возвращает false, если касса закрыта', () => {
        var testCashbox = new Cashbox();
        assert.deepEqual(testCashbox.addPayment({ amount: 10, info: 'cashbox closed' }),
          false);
      });
    });
  describe('cashbox.history - хранит информацию о пейментах и рефандах',
    function() {
      it('Количество записей в history соответствует количеству пейментов и рефандов', () => {
        var testCashbox = new Cashbox();
        testCashbox.open(100);
        testCashbox.addPayment({ amount: 1, info: 'history-1' });
        testCashbox.addPayment({ amount: 2, info: 'history-2' });
        testCashbox.refundPayment({ amount: 2, info: 'history-3' });
        testCashbox.refundPayment({ amount: 1, info: 'history-4' });
        expect(testCashbox.history).to.have.lengthOf(4);
      });
      it('Порядок записей в history соответствует порядку вызова методов', () => {
        var testCashbox = new Cashbox();
        testCashbox.open(100);
        testCashbox.addPayment({ amount: 1, info: 'history-1' });
        testCashbox.addPayment({ amount: 2, info: 'history-2' });
        testCashbox.refundPayment({ amount: 2, info: 'history-3' });
        testCashbox.refundPayment({ amount: 1, info: 'history-4' });
        assert.deepEqual(testCashbox.history[0].info, 'history-1');
        assert.deepEqual(testCashbox.history[1].info, 'history-2');
        assert.deepEqual(testCashbox.history[2].info, 'history-3');
        assert.deepEqual(testCashbox.history[3].info, 'history-4');
      });
    })
});

mocha.run();
/* jshint ignore:end */
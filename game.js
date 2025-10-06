// Основная игровая логика
class PokerDiceGame {
    constructor() {
        this.diceCount = 5;
        this.initDice();
    }

    initDice() {
        const container = document.getElementById('diceContainer');
        container.innerHTML = '';
        
        for (let i = 0; i < this.diceCount; i++) {
            const dice = document.createElement('div');
            dice.className = 'dice';
            dice.textContent = '?';
            dice.id = `dice${i}`;
            container.appendChild(dice);
        }
    }

    rollDice() {
        const diceValues = [];
        
        // Генерируем случайные значения
        for (let i = 0; i < this.diceCount; i++) {
            const value = Math.floor(Math.random() * 6) + 1;
            diceValues.push(value);
            
            // Анимация броска
            this.animateDice(i, value);
        }

        // После анимации проверяем комбинацию
        setTimeout(() => {
            const combination = this.checkCombination(diceValues);
            this.showResult(combination, diceValues);
        }, 600);
    }

    animateDice(index, finalValue) {
        const dice = document.getElementById(`dice${index}`);
        let rolls = 0;
        const maxRolls = 10;
        
        const rollInterval = setInterval(() => {
            const tempValue = Math.floor(Math.random() * 6) + 1;
            dice.textContent = tempValue;
            rolls++;
            
            if (rolls >= maxRolls) {
                clearInterval(rollInterval);
                dice.textContent = finalValue;
            }
        }, 50);
    }

    checkCombination(dice) {
        const counts = {};
        dice.forEach(value => {
            counts[value] = (counts[value] || 0) + 1;
        });

        const values = Object.values(counts).sort((a, b) => b - a);

        // Проверка комбинаций
        if (values[0] === 5) return "Покер!";
        if (values[0] === 4) return "Каре!";
        if (values[0] === 3 && values[1] === 2) return "Фулл-хаус!";
        if (values[0] === 3) return "Тройка!";
        if (values[0] === 2 && values[1] === 2) return "Две пары!";
        if (values[0] === 2) return "Пара!";
        
        return "Старшая кость!";
    }

    showResult(combination, dice) {
        document.getElementById('result').textContent = 
            `Комбинация: ${combination} (${dice.join(', ')})`;
    }
}

// Создаем экземпляр игры
const game = new PokerDiceGame();

// Функция для кнопки
function rollDice() {
    game.rollDice();
}

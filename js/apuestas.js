// Sistema de Validación de Apuestas
class BettingValidationSystem {
  constructor() {
    this.isLoggedIn = false;
    this.user = {
      id: null,
      name: '',
      balance: 1000.00,
      dailyLimit: 200.00,
      weeklyLimit: 500.00,
      dailySpent: 0.00,
      weeklySpent: 0.00,
      totalBets: 15,
      bets: []
    };
    
    this.races = {
      f1: {
        'belgium-2025': {
          name: 'GP de Bélgica 2025',
          closeTime: new Date('2025-08-15T14:00:00'),
          status: 'open'
        },
        'hungary-2025': {
          name: 'GP de Hungría 2025',
          closeTime: new Date('2025-08-01T15:00:00'),
          status: 'closed'
        }
      },
      motogp: {
        'austria-2025': {
          name: 'GP de Austria 2025',
          closeTime: new Date('2025-08-12T13:00:00'),
          status: 'open'
        }
      }
    };

    this.validationRules = {
      minBet: 5.00,
      maxBet: 500.00,
      maxDailyLimit: 200.00,
      maxWeeklyLimit: 500.00,
      minBalance: 0.00,
      closingTimeHours: 2
    };

    this.init();
  }

  init() {
    this.checkLoginStatus();
    this.setupEventListeners();
    this.startCountdowns();
    this.loadBettingHistory();
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.isLoggedIn = true;
      this.user = {...this.user, ...JSON.parse(userData)};
      this.showUserInterface();
      this.hideModal('loginModal');
    } else {
      this.isLoggedIn = false;
    }
  }

  hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
  }

  showUserInterface() {
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('userName').textContent = this.user.name || 'Usuario Premium';
    this.updateUserStats();
  }

  updateUserStats() {
    document.getElementById('userBalance').textContent = `$${this.user.balance.toFixed(2)}`;
    document.getElementById('dailyLimit').textContent = `$${(this.user.dailyLimit - this.user.dailySpent).toFixed(2)}`;
    document.getElementById('weeklyLimit').textContent = `$${(this.user.weeklyLimit - this.user.weeklySpent).toFixed(2)}`;
    document.getElementById('totalBets').textContent = this.user.totalBets;
  }

  setupEventListeners() {
    document.querySelectorAll('.bet-input').forEach(input => {
      input.addEventListener('input', (e) => this.validateBetInput(e.target));
      input.addEventListener('blur', (e) => this.validateBetInput(e.target, true));
    });

    document.querySelectorAll('.betting-option').forEach(option => {
      option.addEventListener('click', () => this.selectBettingOption(option));
    });

    document.getElementById('f1PlaceBet').addEventListener('click', () => {
      this.processBets('f1');
    });

    document.getElementById('motogpPlaceBet').addEventListener('click', () => {
      this.processBets('motogp');
    });

    document.getElementById('confirmBet').addEventListener('click', () => {
      this.confirmBet();
    });

    document.getElementById('cancelBet').addEventListener('click', () => {
      document.getElementById('confirmModal').style.display = 'none';
    });
  }

  validateBetInput(input, showAllMessages = false) {
    const value = parseFloat(input.value);
    const option = input.closest('.betting-option');
    const messageElement = option.querySelector('.validation-message');
    
    let isValid = true;
    let message = '';
    let messageType = 'success';

    if (value && value < this.validationRules.minBet) {
      isValid = false;
      message = `Apuesta mínima: $${this.validationRules.minBet}`;
      messageType = 'error';
    }
    else if (value && value > this.validationRules.maxBet) {
      isValid = false;
      message = `Apuesta máxima: $${this.validationRules.maxBet}`;
      messageType = 'error';
    }
    else if (value && value > this.user.balance) {
      isValid = false;
      message = `Saldo insuficiente. Disponible: $${this.user.balance.toFixed(2)}`;
      messageType = 'error';
    }
    else if (!this.isRaceOpen(this.getCurrentRaceId(option))) {
      isValid = false;
      message = 'Las apuestas para esta carrera están cerradas';
      messageType = 'error';
    }
    else if (value && value >= this.validationRules.minBet) {
      const potentialWin = value * this.getOdds(option);
      message = `Ganancia potencial: ${potentialWin.toFixed(2)}`;
    }

    if (message && (showAllMessages || messageType === 'error')) {
      messageElement.textContent = message;
      messageElement.className = `validation-message validation-${messageType}`;
      messageElement.style.display = 'block';
    } else if (!message) {
      messageElement.style.display = 'none';
    }

    if (value && isValid) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }

    return isValid;
  }

  selectBettingOption(option) {
    option.querySelector('.bet-input').focus();
  }

  getCurrentRaceId(option) {
    const section = option.closest('.betting-section');
    const isF1 = section.querySelector('#f1RaceSelect');
    return isF1 ? document.getElementById('f1RaceSelect').value : document.getElementById('motogpRaceSelect').value;
  }

  isRaceOpen(raceId) {
    const raceData = this.races.f1[raceId] || this.races.motogp[raceId];
    if (!raceData) return false;
    const now = new Date();
    const closeTime = new Date(raceData.closeTime.getTime() - (this.validationRules.closingTimeHours * 60 * 60 * 1000));
    return now < closeTime;
  }

  getOdds(option) {
    return parseFloat(option.querySelector('.odds').textContent);
  }

  processBets(category) {
    const section = document.querySelector(`.betting-section:has(#${category}RaceSelect)`);
    const selectedOptions = section.querySelectorAll('.betting-option.selected');
    
    if (selectedOptions.length === 0) {
      this.showNotification('Selecciona al menos una apuesta', 'warning');
      return;
    }

    let totalAmount = 0;
    const bets = [];
    let hasErrors = false;

    selectedOptions.forEach(option => {
      const input = option.querySelector('.bet-input');
      const amount = parseFloat(input.value);
      
      if (!this.validateBetInput(input, true)) {
        hasErrors = true;
        return;
      }

      totalAmount += amount;
      bets.push({
        type: option.dataset.betType,
        selection: option.dataset.selection,
        amount: amount,
        odds: this.getOdds(option),
        title: option.querySelector('.option-title').textContent
      });
    });

    if (hasErrors) {
      this.showNotification('Corrige los errores antes de continuar', 'error');
      return;
    }

    if (!this.isLoggedIn) {
        console.warn("Usuario no logueado, modo prueba activo");
        this.user.name = "Invitado";
        this.user.id = "guest";
    }

    this.showConfirmationModal(bets, totalAmount, category);
  }

  showConfirmationModal(bets, totalAmount, category) {
    const modal = document.getElementById('confirmModal');
    const detailsElement = document.getElementById('confirmDetails');
    
    let detailsHTML = `<h3>Resumen de Apuestas - ${category.toUpperCase()}</h3><div style="margin: 1rem 0;">`;

    bets.forEach(bet => {
      const potentialWin = bet.amount * bet.odds;
      detailsHTML += `
        <div style="background: rgba(0,0,0,0.3); padding: 1rem; margin: 0.5rem 0; border-radius: 8px;">
          <div><strong>${bet.title}</strong></div>
          <div>Cantidad: ${bet.amount.toFixed(2)} | Cuota: ${bet.odds} | Ganancia potencial: ${potentialWin.toFixed(2)}</div>
        </div>
      `;
    });

    detailsHTML += `
      </div>
      <div style="border-top: 1px solid #444; padding-top: 1rem; margin-top: 1rem;">
        <strong>Total a apostar: ${totalAmount.toFixed(2)}</strong><br>
        <strong>Ganancia potencial total: ${bets.reduce((sum, bet) => sum + (bet.amount * bet.odds), 0).toFixed(2)}</strong>
      </div>
    `;

    detailsElement.innerHTML = detailsHTML;
    modal.style.display = 'flex';
    this.pendingBets = { bets, totalAmount, category };
  }

  confirmBet() {
    if (!this.pendingBets) return;

    const { bets, totalAmount } = this.pendingBets;

    bets.forEach(bet => {
      this.user.bets.push({
        id: Date.now() + Math.random(),
        date: new Date().toISOString().split('T')[0],
        race: bet.title,
        type: bet.type,
        selection: bet.selection,
        amount: bet.amount,
        odds: bet.odds,
        status: 'pending'
      });
    });

    this.user.balance -= totalAmount;
    this.updateUserStats();
    localStorage.setItem('userData', JSON.stringify(this.user));
    document.getElementById('confirmModal').style.display = 'none';
    this.showNotification(`¡Apuesta realizada exitosamente! Total: ${totalAmount.toFixed(2)}`, 'success');
    this.pendingBets = null;
  }

  showNotification(message, type = 'info') {
    alert(message); // Simple para ejemplo
  }
}

const bettingSystem = new BettingValidationSystem();

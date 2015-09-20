function DashboardCtrl ($scope) {
}

function BlackjackCtrl ($scope) {
  // Some 'global' variables.
  var deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  $scope.pot = Number(0);
  var betAmount = Number($scope.betAmount);
  $scope.userHandArr = [0, 0];
  $scope.userSuiteArr = ['None', 'None'];
  $scope.userHand = 0;
  $scope.dealerHandArr = [0, 0];
  $scope.dealerSuiteArr = ['None', 'None'];
  $scope.dealerHand = 0;
  $scope.player = "Card-Master-" + String(getRandomInt(1, 1000));
  $scope.betAmount = 100;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomSuite() {
    suites = ['spades', 'hearts', 'clubs', 'diamonds'];
    random = getRandomInt(0, 4);
    return suites[random];
  }

  // Define a player with two characteristics: name, and wallet.
  var createPlayer = function (name) {
    $scope.player = name;
    // Initial betting amount.
    $scope.playerWallet = 1000;
    // Initial wins/losses count.
    $scope.win = 0;
    $scope.loss = 0;
  };
  createPlayer($scope.player);

  // Get a random number from 0 to 13.
  var randomCard = function() {
    var min = 0;
    var max = 13;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Define what happens when a player wins.
  var playerWin = function() {
    $scope.playerWallet += $scope.pot*2;
    $scope.pot = 0;
    $scope.win++;
    gameOver = true;
  };

  // Define what happens when a dealer wins.
  var dealerWin = function() {
    $scope.pot = 0;
    $scope.loss++;
    gameOver = true;
  };

  // What happens when you push (aka bet).
  var push = function() {
    alert('Push');
    $scope.playerWallet += $scope.pot;
    $scope.pot = 0;
    gameOver = true;
  };

  // What happens when the game finishes.
  var endGame = function() {
    gameOver = true;
    $scope.clear();
  };

  // Calculate the current player's hand.
  var calculateHand = function() {
    userHand = 0;
    dealerHand = 0;
    for (var i = 0; i < userHandArr.length; i++) {
      userHand += userHandArr[i];
      $scope.userHand = userHand;
      $scope.userHandArr = userHandArr;
      $scope.userSuiteArr = userSuiteArr;
      //prevent player from getting 22
      if ((userHand[0] == 11) && (userHand[1] == 11)) {
        userHand[0] = 1;
      }
    }

    for (i = 0; i < dealerHandArr.length; i++) {
      dealerHand += dealerHandArr[i];
      $scope.dealerHand = dealerHand;
      $scope.dealerHandArr = dealerHandArr;
      $scope.dealerSuiteArr = dealerSuiteArr;
      //prevent's getting 22 
      if ((dealerHandArr[0] == 11) && (dealerHandArr[1] == 11)) {
        dealerHand[0] = 1;
      }
    }

    if (userHand == 21 || dealerHand == 21) {
      if ( userHand == 21 ) {
        alert('Player blackjack!');
        playerWin();
      } else if (dealerHand == 21) {
        alert('Dealer blackjack!');
        dealerWin();
      }
    }

    if (userHand > 21 || dealerHand > 21) {
      if (userHand > 21) {
        alert('Player bust!');
        dealerWin();
      } else if (dealerHand > 21) {
        alert('Dealer bust!');
        playerWin();
      }
    }
  };

  $scope.deal = function(  ) {
    $scope.clear();
    if (!$scope.userBet || !$scope.player) {
      alert('You have to put your name in!');
      endGame();
    } else if (!gameOver) {
      $scope.userBet( betAmount );
      //deals 2 cards
      for (var cardnum = 0; cardnum < 2; cardnum++) {
        userHandArr.push(deck[randomCard()]);
        dealerHandArr.push(deck[randomCard()]);
        userSuiteArr.push(getRandomSuite());
        dealerSuiteArr.push(getRandomSuite());
      }
      calculateHand();
    }
  };

  $scope.userHit = function() {
    if (!gameOver) {
      userHandArr.push(deck[randomCard()]);
      userSuiteArr.push(getRandomSuite());
      calculateHand();
    }
  };

  $scope.userBet = function ( betAmount ) {
    if ($scope.playerWallet >= $scope.betAmount) {
      $scope.playerWallet -= $scope.betAmount;
      $scope.pot += $scope.betAmount;
    }
    else {
      alert('You don\'t have enough money in your wallet');
      endGame();
    }
  };

  //defines variables in order to deal()
  $scope.clear = function() {
    gameOver = false;
    userHand = 0;
    dealerHand = 0;
    userHandArr = [];
    dealerHandArr = [];
    userSuiteArr = [];
    dealerSuiteArr = [];
    $scope.userHand = 0;
    $scope.dealerHand = 0;
    $scope.userHandArr = [];
    $scope.dealerHandArr = [];
    $scope.userSuiteArr = [];
    $scope.dealerSuiteArr = [];
  };

  $scope.userStay = function( ) {
    while(dealerHand < 17) {
      dealerHandArr.push(deck[randomCard()]);
      dealerSuiteArr.push(getRandomSuite());
      calculateHand();
    }

    if (userHand > dealerHand) {
      alert('You win! \n Player: ' + userHand + '\n Dealer: ' + dealerHand );
      playerWin();
    } else if (userHand == dealerHand ) {
      push();
    } else if (dealerHand < 22 && dealerHand > userHand) {
      alert('Dealer Wins');
      dealerWin();
    }
  };
}



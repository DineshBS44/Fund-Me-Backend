var ethers = require("ethers");

var url = process.env.RINKEBY_RPC_URL;
var provider = new ethers.providers.JsonRpcProvider(url);
const campaignContractAddress = "0x5c91CA95d1AA821C9ae058939BF4669533a0e343";
const factoryContractAddress = "0x76Bb5584f25b6C31bcf2EC4AfEECF1417A9E3E66";

campaignCreated = {
  address: factoryContractAddress,
  topics: [ethers.utils.id("CampaignCreated(address)")],
};

contributedAmount = {
  address: campaignContractAddress,
  topics: [ethers.utils.id("ContributedAmount(uint256)")],
};

requestCreated = {
  address: campaignContractAddress,
  topics: [ethers.utils.id("RequestCreated(uint256,string,uint256,address)")],
};

requestApproved = {
  address: campaignContractAddress,
  topics: [ethers.utils.id("RequestApproved(uint256,address)")],
};

requestVotingFulfilled = {
  address: campaignContractAddress,
  topics: [ethers.utils.id("RequestVotingFulfilled(uint256)")],
};

var five = require("johnny-five");
var board = new five.Board({ port: "COM4" });

function getBoardInstance() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (board.isReady) {
        clearInterval(interval);
        resolve(board);
      }
    }, 100);
  });
}

provider.on(campaignCreated, () => {
  console.log("Campaign is created");

  getBoardInstance().then((board) => {
    console.log("Board ready 0");
    var led = new five.Led(13);
    led.fadeIn();
    led.strobe();

    board.wait(1000, () => {
      led.fadeOut();
    });
  });
});

provider.on(contributedAmount, () => {
  console.log("Amount is contributed");

  getBoardInstance().then((board) => {
    console.log("Board ready");
    var led = new five.Led(13);
    led.fadeIn();
    led.strobe();

    board.wait(2000, () => {
      led.fadeOut();
    });
  });
});

provider.on(requestCreated, () => {
  console.log("Request is created");

  getBoardInstance().then((board) => {
    console.log("Board ready 2");
    var led = new five.Led(13);
    led.fadeIn();
    led.strobe();

    board.wait(4000, () => {
      led.fadeOut();
    });
  });
});

provider.on(requestApproved, () => {
  console.log("Request is approved by a single contributor");

  getBoardInstance().then((board) => {
    console.log("Board ready 3");
    var led = new five.Led(13);
    led.fadeIn();
    led.strobe();

    board.wait(6000, () => {
      led.fadeOut();
    });
  });
});

provider.on(requestVotingFulfilled, () => {
  console.log("Request voting is fulfilled");

  getBoardInstance().then((board) => {
    console.log("Board ready 4");
    var led = new five.Led(13);
    led.fadeIn();
    led.strobe();

    board.wait(10000, () => {
      led.fadeOut();
    });
  });
});

const mRoomPlayer1 = require("./roomPlayer");
module.exports.loop = function () {
	if(Game.cpu.bucket == 10000) {
	    Game.cpu.generatePixel();
	}
	mRoomPlayer1.getSpawn()
	mRoomPlayer1.goToMine()
	

    Game.notify(
        'screep最高指挥官：您部署的脚本一切正常,正在运行中！',
        30  // group these notifications for 3 hours
    );
};

console.log("主程序开始...")
module.exports.loop = function () {
	if(Game.cpu.bucket == 10000) {
	    Game.cpu.generatePixel();
	}
	var mRoomPlayer1 = require("./roomPlayer");
	console.log("当前总共主巢数量为..." + Object.keys(Game.spawns).length)
	for(spawnName in Game.spawns){
		mRoomPlayer1.init(spawnName)
	}
	
    Game.notify(
        'screep最高指挥官：您部署的脚本一切正常,正在运行中！',
        30  // group these notifications for 3 hours
    );
};

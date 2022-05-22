




module.exports = {

	init

	
		

}

function init(){
	console.log("miner正在初始化")
	console.log('该房间有' + Game.creeps['miner_000'].room.find(FIND_SOURCES).length + '个矿点')
	// for(a in Game.creeps['miner_000'].room.find(FIND_SOURCES)){
		
	// }
	Game.creeps['miner_000'].memory.fullSign = 0;//容错
	if(Game.creeps['miner_000'].store.getUsedCapacity() == 0){
		Game.creeps['miner_000'].memory.fullSign = 0;//没有货物
	}
	if(Game.creeps['miner_000'].store.getFreeCapacity() == 0){
		Game.creeps['miner_000'].memory.fullSign = 1;//没有空余空间
	}
	workMine(Game.creeps['miner_000'].room.find(FIND_SOURCES)[0]){
		
	}
	
	
	
	
}

function workMine(sourceObj){
	Game.creeps['miner_000'].moveTo(sourceObj.pos)
	Game.creeps['miner_000'].harvest(sourceObj)

	
}
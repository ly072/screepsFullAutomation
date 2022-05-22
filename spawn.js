var miner0;
var reach = 0;


function say() {
    console.log('say hello')
}

module.exports = {
	init
}

function init(strategy,stage){
	console.log(strategy + '开始执行！')
	
	if(stage == 0){	
		console.log(stage + '模式发展实例正在创建，开始执行！')
		spawnStageStrategy0()
	}
	
}
function spawnStageStrategy0(){
	console.log('生产三相普通工人！')
	spawnNormalWorker()
	for(creepName in Game.creeps){
		console.log(creepName + '工人实例！')
		WorkerWorkStrategy0(creepName)
	}
	
}

function spawnNormalWorker(){
	// Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'miner_000',{ memory: { fullSign: 0 } });//cost 300
	// Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'miner_001',{ memory: { fullSign: 0 } });//cost 300
	// Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'miner_002',{ memory: { fullSign: 0 } });//cost 300
	// Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'miner_003',{ memory: { fullSign: 0 } });//cost 300
	// Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'miner_004',{ memory: { fullSign: 0 } });//cost 300
	const extensions = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
		/* 这是一个过滤器，过滤建筑，返回建筑类型是扩容器或者虫巢，条件是未满载的*/
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_EXTENSION && structure.energy ==50);
		}
	});
	
	for(i=0;i<9;i++){
		minerName = 'miner_' + i.toString()
		if(Game.spawns['Spawn1'].store.energy + extensions.length * 50 >= 600){
			Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], minerName,{ memory: { fullSign: 0 ,roadSign: 0} });//cost 300
		}else if(Game.spawns['Spawn1'].store.energy + extensions.length * 50 >= 400){
			Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], minerName,{ memory: { fullSign: 0 ,roadSign: 0} });//cost 300
		}else{
			Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], minerName,{ memory: { fullSign: 0 ,roadSign: 0} });//cost 300
		}
		
	}
	for(i=0;i<3;i++){
		minerName = 'builder_' + i.toString()
		if(Game.spawns['Spawn1'].store.energy + extensions.length * 50 >= 800){
			Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], minerName,{ memory: { fullSign: 0 ,roadSign: 0} });//cost 300
		}else if(Game.spawns['Spawn1'].store.energy + extensions.length * 50 >= 600){
			Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], minerName,{ memory: { fullSign: 0 ,roadSign: 0} });//cost 300
		}else if(Game.spawns['Spawn1'].store.energy + extensions.length * 50 >= 400){
			Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], minerName,{ memory: { fullSign: 0 ,roadSign: 0} });//cost 300
		}else{	
			Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], minerName,{ memory: { fullSign: 0 ,roadSign: 0} });//cost 300
		}
		
	}
	//Game.spawns['Spawn1'].spawnCreep([CLAIM,MOVE], minerName,{ memory: { fullSign: 0 ,roadSign: 0} });//cost 300
	
	//Game.creeps['claimer_000'].moveTo(new RoomPosition(32, 29, 'E57S38'));
	//Game.creeps['claimer_000'].claimController(Game.getObjectById('5bbcb0829099fc012e63c49b'))
}

function WorkerWorkStrategy0(creepName){
	console.log(creepName+'等待验证！')
	if(Object.keys(Game.creeps).indexOf(creepName) != -1){
		console.log(creepName + '工人开始工作，依据Strategy0！')
		mWorker = require("./worker");
		if(creepName.indexOf('miner') != -1){
			mWorker.init(creepName,'Mine')
		}
		else if(creepName.indexOf('builder') != -1){
			mWorker.init(creepName,'Build')
		}
		
		
	}
	else{
		console.log('验证失败' + Object.keys(Game.creeps).indexOf(creepName))
	}
}

// function spawnMiner(){
//         say()
//         console.log(Game.spawns['Spawn1'].energy)
// 		Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'miner_000',{ memory: { ResourceTargetTimes: 0 } });//cost 300
// 		if(Game.creeps['miner_000'] != null){
// 			mMiner0 = require("./miner");

// 			if(Game.creeps['miner_000'].harvest(Game.creeps['miner_000'].room.find(FIND_SOURCES)[0]) == 0){
// 				Game.creeps['miner_000'].memory.ResourceTarget = Game.creeps['miner_000'].pos;
// 				if(Game.creeps['miner_000'].memory.ContainerTarget == null){
// 					mMiner0.findWayBack()
// 				}	
// 				else{
// 				    Game.spawns['Spawn1'].room.createConstructionSite(Game.creeps['miner_000'].memory.ContainerTarget.x, Game.creeps['miner_000'].memory.ContainerTarget.y, STRUCTURE_CONTAINER, 'Spawn1');
// 				    Game.creeps['miner_000'].build(Game.creeps['miner_000'].pos.findClosestByRange(FIND_CONSTRUCTION_SITES))
				    
// 				}
// 			}
// 			else{
// 				console.log(Game.creeps['miner_000'].room.find(FIND_SOURCES))
				
// 			}
// 			mMiner0.findWay()
// 			Game.creeps['miner_000'].memory.ResourceTargetTimes = 1

// 			return true;
// 		}
// 		return false;
		
//     }
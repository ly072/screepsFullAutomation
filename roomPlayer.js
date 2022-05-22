var mSpawn1;

console.log('读取roomPlayer类...')


module.exports = {
	init,
	getExtensionsCount,
	getContainersCount
	
	// goToMine : function(){
	// 	if(mSpawn1.spawnMiner()){
	// 		console.log('True')
	// 	}
		
	// }
}
//------------------------------




//------------------------------
function init(spawnName) {
	console.log('读取主巢' + spawnName+'...');
	console.log('读取房间' + Game.spawns['Spawn1'].room.name);
	
	// for(keys in Game.spawns['Spawn1'].room){
	// 	console.log(keys);
	// }
	console.log('读取当前扩增器数量' + getExtensionsCount(Game.spawns['Spawn1'].room));
	console.log('读取当前小型容器数量' + getContainersCount(Game.spawns['Spawn1'].room));
	
	//---------------------------------------------tower-----------------------------------------------------------
	//console.log(Tower)
	const Tower = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
	            /* 这是一个过滤器，过滤建筑，返回建筑类型是扩容器或者虫巢，条件是未满载的*/
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_TOWER);
	            }
	        });
	const Repairs = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
	            /* 这是一个过滤器，过滤建筑，返回建筑类型是扩容器或者虫巢，条件是未满载的*/
	            filter: (structure) => {
	                return (structure.hits< (structure.hitsMax * 0.7));
	            }
	        });
	
	
	
	const hostiles = Game.spawns['Spawn1'].pos.findInRange(FIND_HOSTILE_CREEPS, 50);
	if(hostiles.length > 0) {
	    
	    //if(hostiles[0].owner.username != "shiler"){
	        //console.log("enemy"+hostiles[0])
	        Tower[0].attack(hostiles[0])
	        //Game.creeps['c004'].say('ATTACK^_^');
	   // }
	    // else{
	    //     Game.creeps['c004'].say('WELCOME');
	    // }
	
	    
	}
	else{
	        Tower[0].repair(Repairs[0])
	    }
//-----------------------------------------------------------------
	
	const terrain = Game.map.getRoomTerrain(Game.spawns['Spawn1'].room.name);
	getMapTerrain(terrain)
	
	
	
	
	
	var mSpawn1 = require("./spawn");
	if(getExtensionsCount(Game.spawns['Spawn1'].room) >= 5){
		Game.spawns['Spawn1'].memory.Stage = 1
	}
	else{
		Game.spawns['Spawn1'].memory.Stage = 0
	}
	mSpawn1.init('经济总量《=300，使用0阶段策略',0)
    console.log('执行结束');
}

function getContainersCount(roomObj){
	const Containers = roomObj.find(FIND_STRUCTURES, {
		filter: (i) => i.structureType == STRUCTURE_CONTAINER 
					  // i.store[RESOURCE_ENERGY] > 0
	});
	return Containers.length

}

function getExtensionsCount(roomObj){
	const Extensions = roomObj.find(FIND_STRUCTURES, {
		filter: (i) => i.structureType == STRUCTURE_EXTENSION 
					  // i.store[RESOURCE_ENERGY] > 0
	});
	return Extensions.length

}


function getMapTerrain(terrain){
	console.log('正在寻找最大的布阵地点')
	// var arr = new Array();         //先声明一维
	// for(var i=0;i<50;i++){          //一维长度为5
	//           arr[i]=new Array(i);    //在声明二维
	//           for(var j=0;j<50;j++){      //二维长度为5
	//              arr[i][j]= isWall(terrain,i,j);
	//        }
	// } 
		

	// Game.spawns['Spawn1'].memory.x = 0
	// Game.spawns['Spawn1'].memory.y = 0
	// Game.spawns['Spawn1'].memory.BiggestSquare = 0
	// Game.spawns['Spawn1'].memory.Bx = 0
	// Game.spawns['Spawn1'].memory.By = 0
	//Game.spawns['Spawn1'].memory.y =70
	

	
	//console.log('正在寻找最大的布阵地点数组')
	var odd = 1
	if(Game.spawns['Spawn1'].memory.y <50){
		findBiggestSquare(terrain)
	}else{
		layer = Game.spawns['Spawn1'].memory.BiggestSquare
		for(i=Game.spawns['Spawn1'].memory.Bx-(layer-1);i<=Game.spawns['Spawn1'].memory.Bx+(layer-1);i++){
			for(j=Game.spawns['Spawn1'].memory.By-(layer-1);j<=Game.spawns['Spawn1'].memory.By+(layer-1);j++){
				odd = odd * -1
				if(odd > 0){
					Game.spawns['Spawn1'].room.createConstructionSite(i, j, STRUCTURE_EXTENSION, 'Spawn1');
				}else{
					Game.spawns['Spawn1'].room.createConstructionSite(i, j, STRUCTURE_ROAD, 'Spawn1');
				}
			}
		}
		
		Game.spawns['Spawn1'].memory.y = 100
	}
	
	Game.spawns['Spawn1'].room.createConstructionSite(Game.spawns['Spawn1'].pos.x+1,Game.spawns['Spawn1'].pos.y+1, STRUCTURE_TOWER, 'Spawn1');
	// for(var i = 39;i<49;i++){
	// 	Game.spawns['Spawn1'].room.createConstructionSite(i,23, STRUCTURE_CONTAINER, 'Spawn1');
	// }
	
	
}

function findBiggestSquare(terrain){
	var BiggestSquare = Game.spawns['Spawn1'].memory.BiggestSquare

	var mSquare = CanExtenseLayer(terrain,Game.spawns['Spawn1'].memory.x,Game.spawns['Spawn1'].memory.y)
	console.log('当前msquare' + mSquare + '当前BiggestSquare'+ BiggestSquare)
	//mSquare = 0
	if( mSquare > BiggestSquare){
		Game.spawns['Spawn1'].memory.BiggestSquare = mSquare
		Game.spawns['Spawn1'].memory.Bx = Game.spawns['Spawn1'].memory.x
		Game.spawns['Spawn1'].memory.By = Game.spawns['Spawn1'].memory.y
	}
	console.log('已找到最大的布阵中心为' + Game.spawns['Spawn1'].memory.Bx + "," + Game.spawns['Spawn1'].memory.By + ".可以扩展" + BiggestSquare + '层' )
	console.log('当前进行到' + Game.spawns['Spawn1'].memory.x +','+ Game.spawns['Spawn1'].memory.y + '地形：' + isWall(terrain,Game.spawns['Spawn1'].memory.x,Game.spawns['Spawn1'].memory.y))
	Game.spawns['Spawn1'].memory.x = Game.spawns['Spawn1'].memory.x + 1
	if(Game.spawns['Spawn1'].memory.x  == 50){
		Game.spawns['Spawn1'].memory.x = 0 
		Game.spawns['Spawn1'].memory.y = Game.spawns['Spawn1'].memory.y + 1
	}	
}

function CanExtenseLayer(terrain,x,y){
	var maxLayer = 1
	var judge = true
	while(judge){
		layer = maxLayer
		var canEx = true
		for(i=x-(layer-1);i<=x+(layer-1);i++){
			for(j=y-(layer-1);j<=y+(layer-1);j++){
				console.log('x:'+i+'y:'+j+'ju:'+isWall(terrain,i,j))
				if(isWall(terrain,i,j) == 0){
					canEx = false
				}
			}
		}
		console.log(canEx)
		if(canEx){
			maxLayer = maxLayer + 1
		}else{
			if(maxLayer < layer){
				maxLayer = layer
			}
			judge = false
		}
	}
	return maxLayer-1
}


function isWall(terrain,x,y){
	switch(terrain.get(x,y)) {
		case TERRAIN_MASK_WALL:
			return 0
	}
	return 1
}











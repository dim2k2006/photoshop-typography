#target Photoshop  
function run(){
    var layerSets = app.activeDocument.layerSets;
    dumpLayerSets(layerSets);
    dumpLayers(app.activeDocument.layers);
}

function dumpLayerSets(layerSets){
    $.writeln("--- Processing...");
    var len = layerSets.length;
    for(var i=0;i<len;i++){
        var layerSet = layerSets[i];
       
        dumpLayers(layerSet.artLayers);
    }

    $.writeln("Font List Ready!");
}

function dumpLayers(layers){
    var len = layers.length;
    var line = '';

    for(var i=0;i<len;i++){
        var layer = layers[i];

        if(layer.kind==undefined){
        	continue;
        }

        if(layer.kind == LayerKind.TEXT){
        	line += 'font: '+ layer.textItem.font +' font-size: ' + layer.textItem.size + ' color: #' + layer.textItem.color.rgb.hexValue + '\n';
        }
    }

    var Name = activeDocument.name.match(/(.*)\.[^\.]+$/)[1];
    var outFile = File(Folder.desktop + "/" + Name + "__typography.txt");  
    outFile.open('e');
    outFile.seek (0, 2);
    outFile.writeln (line);  
	outFile.close();
}
run();
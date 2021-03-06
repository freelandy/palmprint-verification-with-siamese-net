var syspath = '/Users/angel/Desktop/computer_vision/finalproject/palmprint-verification-with-siamese-net/';
var darkpath = '/Users/angel/Desktop/computer_vision/darknet/';

function dataLeftCompleting(bits, identifier, value){
    value = Array(bits + 1).join(identifier) + value;
    return value.slice(-bits);
}

function darknet(label, direction, index) {
    var exec = require('child_process').exec;
    var txt_path = darkpath + 'current_path.txt';
    var jpg_path = syspath + 'backend/pyScripts/data/'+label + '/' + direction + '/' + dataLeftCompleting(5,'0', index)+'.jpg';
    var res_path = syspath + 'backend/pyScripts/data/'+label + '/' + direction + '/' + dataLeftCompleting(5,'0', index)+'.txt';
    var fs = require('fs');
    fs.writeFile(txt_path, jpg_path, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    // var fso=new ActiveXObject(Scripting.FileSystemObject);
    // var f=fso.createtextfile(txt_path,2,true);
    // f.writeLine(jpg_path);
    // f.close();

    var cmd = darkpath + 'darknet detector test ' + darkpath+ 'obj.data ' + darkpath +'yolo-obj.cfg ' +darkpath+'yolo-obj_final.weights ' +
        '-dont_show -ext_output < ' + txt_path + ' > ' + res_path;
    exec(cmd, function(err,stdout,stderr){
        if(err)
        {
            console.log('stderr',err);
        }
        if(stdout)
        {
            console.log('stdout',stdout);
        }
    });
};

function tailor(label, direction, index) {
    var exec = require('child_process').exec;
    var arg1 = label;
    var arg2 = direction;
    var arg3 = index;
    var filename = syspath + 'backend/pyScripts/Tailor.py';
    exec('python'+' '+filename+' '+arg1+' '+arg2+' '+arg3+' '+syspath,function(err,stdout,stderr){
        if(err)
        {
            console.log('stderr',err);
        }
        if(stdout)
        {
            // console.log('stdout',stdout);
            // var astr = stdout.split('\r\n').join('');//delete the \r\n
            var astr = stdout.split('\n');
            // console.log('aaaaaaaa',astr, astr.length)
            var json = astr[astr.length-2];
            // console.log('json',json);

            var obj = JSON.parse(json);

            console.log('result',obj.result);
            return obj.result   // success: 0   error: 1
        }
    });
};

function verify(label) {
    var exec = require('child_process').exec;
    var arg1 = label;
    var filename = syspath + 'backend/pyScripts/Verification.py';
    exec('python'+' '+filename+' '+arg1+' '+syspath,function(err,stdout,stderr){
        if(err)
        {
            console.log('stderr',err);
        }
        if(stdout)
        {
            console.log('stdout',stdout);
            var astr = stdout.split('\n');
            console.log('as',astr);
            var json = astr[astr.length-2];
            var obj = JSON.parse(json);
            console.log('result',obj.result);
            return obj.result   // success: 0   error: 1
        }
    });
};








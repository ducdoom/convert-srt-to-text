$(document).ready(function () {
    addEventListeners();
});

function addEventListeners() {
    $("#btn-convert").click(function () { convertSrtToText(); });

}

function convertSrtToText() {
    var input = $("#txt-input").val();
    var output = $("#txt-output").val();
    var lines = input.split("\n");
    /*
    1
00:00:01,030 --> 00:00:02,860
Được lắp đặt trên tầng cao nhất của một

2
00:00:02,870 --> 00:00:05,250
chung cư à. Chiếc camera nhỏ bé này

3
00:00:05,530 --> 00:00:07,590
được coi là con mắt thần của phường Bình
    */

    //remove empty lines, trim lines, number lines, and remove timestamps
    var output = "";
    var concatString = "";
    var listText = [];
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].trim() == "") continue;

        //remove if line is a number and next line is a timestamp
        if (lines[i].trim().match(/^\d+$/) && lines[i + 1].trim().match(/^\d\d:\d\d:\d\d,\d\d\d --> \d\d:\d\d:\d\d,\d\d\d$/)) continue;
        
        //remove if line is a timestamp
        if (lines[i].trim().match(/^\d\d:\d\d:\d\d,\d\d\d --> \d\d:\d\d:\d\d,\d\d\d$/)) continue;

        //keep line if it is not a number or timestamp and add to listText
        concatString += lines[i].trim() + " ";
    }

    //remove duplicate spaces
    concatString = concatString.replace(/\s+/g, ' ');

    //add break line after each period for each sentence
    concatString = concatString.replace(/\. /g, '.\n');
    
    output = concatString;

    $("#txt-output").val(output);
}
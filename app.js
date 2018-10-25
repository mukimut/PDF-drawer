var pdfDocument = require('pdfkit');
var fs = require('fs');


var myColors = { 
    grey: "#565656", 
    yellow: "#FFC000",
    green: "#00B050", 
    blue: "#0070C0",
    red: "#FF0000",
    frameColor: "#f8bcd2",
    questionColor: "#00B050" 
};

var xPosition = 25, yPosition = 13;
var cellWidth = 250, cellHeight = 220;
var question = {abc: "72", answer: "259"};

pdf=new pdfDocument({size: 'A4', margin: 0});

drawCell00(pdf, xPosition, yPosition, cellWidth, cellHeight, myColors, question);
xPosition=313;
drawCell01(pdf, xPosition, yPosition, cellWidth, cellHeight, myColors, question);

pdf.pipe(fs.createWriteStream('file.pdf'));
console.log('Filing done');
pdf.end();

function drawCell00(doc, xPosition, yPosition, cellWidth, cellHeight, colors, question){
    var questionFontSize=18
    var numberFontSize=24
    var xMargin=5;

    doc.roundedRect(xPosition, yPosition, cellWidth, cellHeight, cellWidth/10).lineWidth(4).stroke(colors.frameColor);

    // Text
    doc.fontSize(questionFontSize).fillColor(colors.questionColor);
    doc.text("Show below", xPosition + xMargin, yPosition + cellHeight / 10 * 1, { width: cellWidth - 2 * xMargin, align: 'center' });
    doc.fontSize(numberFontSize);
    doc.text(question.abc, xPosition + xMargin, yPosition + cellHeight / 10 * 2, { width: cellWidth - 2 * xMargin, align: 'center' });

    // Rounded square
    boxWidth=cellWidth*.5;
    doc.lineWidth(1)
        .roundedRect(xPosition + cellWidth/2-cellWidth*.25, yPosition + 160, boxWidth, cellHeight * 0.12, cellWidth / 100)
        .stroke(colors.grey);

    doc.lineWidth(2.5);


    // Tens
    currentStartPosition=cellWidth/2-boxWidth/4+xPosition
    doc.moveTo(currentStartPosition, yPosition + 160)
        .lineTo(currentStartPosition, yPosition + 70)
        .lineWidth(6)
        .stroke(colors.grey);
    doc.fillColor(colors.red).fontSize(questionFontSize)
        .text("T", currentStartPosition - questionFontSize / 2.8, yPosition + 165);


    // Ones
    currentStartPosition=cellWidth/2+boxWidth/4+xPosition
    doc.moveTo(currentStartPosition, yPosition + 160)
        .lineTo(currentStartPosition, yPosition + 70)
        .lineWidth(6)
        .stroke(colors.grey);

    doc.fillColor(colors.yellow).fontSize(questionFontSize)
        .text("O", currentStartPosition - questionFontSize / 2.8, yPosition + 165);

    console.log('Drawing done');
}

function drawCell01(doc, xPosition, yPosition, cellWidth, cellHeight, colors, question){
    var questionFontSize=18
    var numberFontSize=24
    var xMargin=5;

    doc.roundedRect(xPosition, yPosition, cellWidth, cellHeight, cellWidth/10).lineWidth(4).stroke(colors.frameColor);

    // Text
    doc.fontSize(questionFontSize).fillColor(colors.questionColor);
    doc.text("What is this number?", xPosition + xMargin, yPosition + cellHeight / 10 * 1, { width: cellWidth - 2 * xMargin, align: 'center' });

    // Rounded square
    boxWidth=cellWidth*.4;
    doc.lineWidth(1)
        .roundedRect(xPosition + cellWidth/4-boxWidth/2, yPosition + 170, boxWidth, cellHeight * 0.12, cellWidth / 100)
        .stroke(colors.grey);

    doc.lineWidth(2.5);


    // Tens
    currentStartPosition=cellWidth/4-boxWidth/4+xPosition
    doc.moveTo(currentStartPosition, yPosition + 170)
        .lineTo(currentStartPosition, yPosition + 70)
        .lineWidth(5)
        .stroke(colors.grey);
    doc.fillColor(colors.red).fontSize(questionFontSize)
        .text("T", currentStartPosition - questionFontSize / 2.8, yPosition + 175);
    
    ///Red Dashes
    twoStartPosition=currentStartPosition-boxWidth/8;
    doc.moveTo(twoStartPosition, yPosition+160).lineTo(twoStartPosition+boxWidth/4, yPosition+160).lineWidth(5).stroke(colors.red);
    doc.moveTo(twoStartPosition, yPosition+150).lineTo(twoStartPosition+boxWidth/4, yPosition+150).lineWidth(5).stroke(colors.red);

    // Ones
    currentStartPosition=cellWidth/4+boxWidth/4+xPosition
    doc.moveTo(currentStartPosition, yPosition + 170)
        .lineTo(currentStartPosition, yPosition + 70)
        .lineWidth(5)
        .stroke(colors.grey);
    doc.fillColor(colors.yellow).fontSize(questionFontSize)
        .text("O", currentStartPosition - questionFontSize / 2.8, yPosition + 175);
    
    //Yellow Dashes
    fourStartPosition=currentStartPosition-boxWidth/8;
    doc.moveTo(fourStartPosition, yPosition+160).lineTo(fourStartPosition+boxWidth/4, yPosition+160).lineWidth(5).stroke(colors.yellow);
    doc.moveTo(fourStartPosition, yPosition+150).lineTo(fourStartPosition+boxWidth/4, yPosition+150).lineWidth(5).stroke(colors.yellow);
    doc.moveTo(fourStartPosition, yPosition+140).lineTo(fourStartPosition+boxWidth/4, yPosition+140).lineWidth(5).stroke(colors.yellow);
    doc.moveTo(fourStartPosition, yPosition+130).lineTo(fourStartPosition+boxWidth/4, yPosition+130).lineWidth(5).stroke(colors.yellow);


    //dashed box
    dashedBoxHeight=cellHeight*.5;
    dashedBoxX=xPosition+cellWidth*.75-boxWidth/2;
    dashedBoxY=yPosition+70;

    doc.moveTo(dashedBoxX, dashedBoxY).lineTo(dashedBoxX+boxWidth,dashedBoxY).dash(3, {space: 2}).lineWidth(1).stroke(colors.grey);
    doc.moveTo(dashedBoxX, dashedBoxY).lineTo(dashedBoxX,dashedBoxY+dashedBoxHeight).dash(3, {space: 2}).lineWidth(1).stroke(colors.grey);
    doc.moveTo(dashedBoxX, dashedBoxY+dashedBoxHeight+3).lineTo(dashedBoxX+boxWidth,dashedBoxY+dashedBoxHeight+3).dash(3, {space: 2}).lineWidth(1).stroke(colors.grey);
    doc.moveTo(dashedBoxX+boxWidth, dashedBoxY+dashedBoxHeight+3).lineTo(dashedBoxX+boxWidth,dashedBoxY+3).dash(3, {space: 2}).lineWidth(1).stroke(colors.grey);
    
    
    
    console.log('Drawing done');
}

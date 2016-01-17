/* A convenience function to reverse a string, and
 * one to set the content of an element.
 */
var newText="";
var keys = ["important", "critical", "test", "exam", "quiz"];
var interrogatives = ["who", "where", "what","whose", "whom", "how"];
var input, prior,reversed, count, orig, oldText, timeout;

//ending the examples - on another note, additionally,
//ignoring fillers - ummm, uh
//pause for a good amount of time -> new line
//italics for questions - interrogative pronouns

function reverse(s) {
  return s.split('').reverse().join('');
}

function boldKey(s) {
  for (var i = 0; i < keys.length; i++) {
    if (s.search(keys[i]) >= 0) {
      s = s.replace(RegExp(keys[i], 'g'), keys[i].bold());
    }
  }
  return s;
}

function parseExample(s) {
    return s.split(new RegExp(("for example|for instance|to illustrate|an example"), 'g'));
}

function bulletByAnd(s) {
    var a = new RegExp(("and also|and|also"), 'g');
    //if (a.test(s)) {
    return s.split(a);
    //}
}

function parseQuestion(s) {
    for (var i = 0; i < interrogatives.length; i++) {
        if (s.search(interrogatives[i]) >= 0) {
            s = s.replace(RegExp(interrogatives[i], 'g'), interrogatives[i].italics());
        }
    }
    return s;
}

function set(el,text){
 while (el.firstChild) el.removeChild(el.firstChild);
  el.appendChild(document.createTextNode(text))}

/* setupUpdater will be called once, on page load.
 */

function setupUpdater(){
 console.log("IN HERE!");

 input = document.getElementsByTagName('span')[1];
    prior = document.getElementsByTagName('span')[0];
  reversed = document.getElementById('reversed')
   , count = document.getElementById('charCount')
   , orig = document.getElementById('original') //EDIT FOR USE WITH SPEECH SCRIPT -Jay
   , oldText = input.value
   , timeout = null;

/* handleChange is called 50ms after the user stops
   typing. */
}
function handleChange(){
  newText = prior.innerHTML.concat(input.innerHTML); //formerly value
  if (newText == oldText) {
    return;
  } else {
    oldText = newText;
  }
    var p = parseExample(newText);
    stringSum = "";
    for(i = 0; i < p.length; i++) {
        stringSum += p[i];
        if(i < p.length - 1) { //not the last thing
            stringSum += "<br /> Example:";
        }
    }
    $("#parsed").html(stringSum);

    //spaces for ands
    var q = bulletByAnd(stringSum);
    stringSum = "";
    for(i = 0; i < q.length; i++) {
        stringSum += q[i];
        if(i < q.length - 1) { //not the last thing
            stringSum += "<br />";
        }
    }
    //bold words
    stringSum = boldKey(stringSum);
    $("#parsed").html(stringSum);

    //question italics
    stringSum = parseQuestion(stringSum);
    $("#parsed").html(stringSum);

    ////highlighting macro
    $.getScript('/HackDuke/jquery.highlight.js', function() {
        //$('head').append('<link rel="stylesheet" href="noteStyle.css" type="text/css"/>');
        console.log("hello");
        $("#parsed").highlight("due");
        $("#parsed").highlight2("mistake");
        $("#parsed").highlight2("oops");
        $("#parsed").highlight2("messed up");
});

    //sets the original before it
  set(count, 'You entered ' + newText.length + ' characters.');
  set(orig, newText);


/* eventHandler is called on keyboard and mouse events.
   If there is a pending timeout, it cancels it.
   It sets a timeout to call handleChange in 50ms. */
 function eventHandler() {
  if (timeout) {
    clearTimeout(timeout);
  }
  console.log("HEADIN TO THAT TIMEOUT");
  timeout = setTimeout(handleChange, 50);
 }
 function downloadPDF() {
     var doc = new jsPDF();
     var myStr = $("#parsed").innerHTML;
     var myRes = "";
     while(myStr.substring(point).length>25)
     {
           myRes=myRes+myStr.substring(point,point+25)+"\n";
           point+=25;
     }
     doc.text(20, 20, myRes);
     doc.save("File.pdf");
 }

 //input.onclick = eventHandler;
  //input.onkeydown = input.onkeyup = input.onclick = eventHandler;
  input.onclick = eventHandler;
}
//$("#interim_span").text('test').trigger('change');
//$("#interim_span").on('change',function(){
//     //Do calculation and change value of other span2,span3 here
//     console.log("CHANGEY");
//     setupUpdater();
//});
document.getElementsByTagName('span')[1].focus();

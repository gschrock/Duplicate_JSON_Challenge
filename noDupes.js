(function(){ 
  var fs = require('fs');
  
  var data = fs.readFileSync(process.argv[2]);
  data = JSON.parse(data);


  function deDupe(leads) {
    var seen = {};
    var dupes = [];
    var noDupes = [];
    
    
    data.leads.sort(function(a, b) {
      return b.entryDate > a.entryDate;
    });

    data.leads.forEach(function(currentItem, index) {
      if (seen[currentItem.email]) {
        dupes.push(currentItem);
      } else {
        noDupes.push(currentItem);
        seen[currentItem.email] = true;
      }
    });
    
    noDupes.forEach(function(currentItem, index) {
      if (seen[currentItem._id]) {
        dupes.push(currentItem);
        noDupes.splice(index, 1);
      } else {
        seen[currentItem._id] = true;
      }
    });
   
    console.log("Original Lead Records ", '\n', data.leads);
    console.log('\n');
    console.log("Removed Duplicate Records: ", '\n', dupes);
    console.log('\n');
    console.log(" Non-duplicate Records: ", '\n', noDupes);
  };
  
  deDupe(data);
}());

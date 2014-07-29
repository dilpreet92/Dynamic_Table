function CreateDynamicTable(elements) {
  this.buttonElement = elements.buttonElement;
  this.tableElement = elements.tableElement;
}

CreateDynamicTable.prototype.EMAIL_STR = "([a-z]|[0-9]|.)+@([a-z]|[0-9])+.([a-z]{3,}|[a-z]{3,}.[a-z]{2})";
 
CreateDynamicTable.prototype.NAME_STR = "([a-zA-Z][a-zA-Z]*)";  

CreateDynamicTable.prototype.addInputTextBox = function(classOfInputElement) {
  return ($("<input/>").addClass(classOfInputElement));
};

CreateDynamicTable.prototype.addButton = function(value , classOfElement) {
  return ($("<button />").text(value).addClass(classOfElement));
};

CreateDynamicTable.prototype.addNewRow = function() {
  this.tableElement.find("tr:last").after($("<tr/>")
    .append(
      $("<td/>").append(this.addInputTextBox("name")),
      $("<td/>").append(this.addInputTextBox("email")),
      $("<td/>").append(this.addButton("save", "save"))
      )); 
};

CreateDynamicTable.prototype.getRowElements = function(currentElement, classOfElement) {
   return (currentElement.closest("tr").find(classOfElement));
};

CreateDynamicTable.prototype.validate = function(currentItemValue, currentString) {
  var PATT = new RegExp(currentString);
  if(!PATT.test(currentItemValue)) {
    alert("Please Enter Correct Details");
    return false;
  }
  return true;
};

CreateDynamicTable.prototype.editText = function(cuurentEditButton) {
  var nameTextElement = this.getRowElements(cuurentEditButton, ".name"),
      emailTextElement = this.getRowElements(cuurentEditButton, ".email");
  this.replaceLabel(nameTextElement,"name"); 
  this.replaceLabel(emailTextElement,"email");
  this.enableSaveButton(cuurentEditButton);   
};

CreateDynamicTable.prototype.enableSaveButton = function(cuurentEditButton) {
  cuurentEditButton.parent("td").replaceWith($("<td/>").append(this.addButton("save", "save")));
};

CreateDynamicTable.prototype.replaceLabel = function(currentElement,classOfElement) {
  currentElement.replaceWith(this.addInputTextBox(classOfElement).attr("value", currentElement.text()));
};


CreateDynamicTable.prototype.enableEditDelete = function(currentSaveButton) {  
  currentSaveButton.replaceWith(this.addButton("Edit", "edit"),this.addButton("Delete", "delete"));
};

CreateDynamicTable.prototype.addLabel = function(currentElement,classOfElement) {
  var labelElement = $("<label/>");
    currentElement.replaceWith(labelElement.text(currentElement.val()).addClass(classOfElement));
};

CreateDynamicTable.prototype.saveText = function(currentSaveButton) {
  var emailTextElement = this.getRowElements(currentSaveButton,".email"),
      nameTextElement = this.getRowElements(currentSaveButton,".name");
  if(this.validate(nameTextElement.val(), this.NAME_STR) & this.validate(emailTextElement.val(), this.EMAIL_STR)) {
    this.enableEditDelete(currentSaveButton);
    this.addLabel(nameTextElement, "name");
    this.addLabel(emailTextElement, "email");    
  }     
};

CreateDynamicTable.prototype.bindEvents = function() {
  var _this = this;
  this.buttonElement.on("click",function() {
    _this.addNewRow();
  });
  this.tableElement.on("click",".save",function() {
    _this.saveText($(this));
  });
  this.tableElement.on("click",".edit",function() {
    _this.editText($(this));
  });
  this.tableElement.on("click",".delete",function() {
    $(this).closest("tr").remove();
  });
};

$(document).ready(function() {
  var elements = {
    "buttonElement" : $("#addRow"),
    "tableElement" : $("#userData")
  };
  var addRowObj = new CreateDynamicTable(elements);
  addRowObj.bindEvents();
});
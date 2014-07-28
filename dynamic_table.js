function CreateDynamicTable(elements) {
  this.buttonElement = elements.buttonElement;
  this.tableElement = elements.tableElement;
}

CreateDynamicTable.prototype.EMAIL_STR = "([a-z]|\d|.|#|$|)*@([a-z]|\d)*.([a-z][a-z][a-z]|[a-z][a-z].[a-z][a-z])";
 
CreateDynamicTable.prototype.NAME_STR = "([a-zA-Z][a-zA-Z]*)";  

CreateDynamicTable.prototype.addNewRow = function() {
  var saveButton = $("<button />").text("save").addClass("save"),
      nameControl = $("<input/>").addClass("name"),
      emailControl = $("<input/>").addClass("email");
  this.tableElement.find("tr:last").after($("<tr/>")
    .append($("<td/>").append(nameControl))
    .append($("<td/>").append(emailControl))
    .append($("<td/>").append(saveButton))); 
};

CreateDynamicTable.prototype.getRowElements = function(currentElement,classOfElement) {
   return (currentElement.closest("tr").find(classOfElement));
};

CreateDynamicTable.prototype.isNameValid = function(currentName) {
  var NAME_PATT = new RegExp(this.NAME_STR);
  if(!NAME_PATT.test(currentName)) {
    alert("Please Enter Name");
    return false;
  }
  return true;
};

CreateDynamicTable.prototype.isEmailValid = function(currentEmail) {
  var EMAIL_PATT = new RegExp(this.EMAIL_STR);
  if(!EMAIL_PATT.test(currentEmail)) {
    alert("Please Enter Correct Email");
    return false;
  }
  return true;
};

CreateDynamicTable.prototype.editText = function(cuurentEditButton) {
  var nameTextElement = this.getRowElements(cuurentEditButton,".name"),
      emailTextElement = this.getRowElements(cuurentEditButton,".email");
  this.addTextBox(nameTextElement,"name"); 
  this.addTextBox(emailTextElement,"email");
  this.enableSaveButton(cuurentEditButton);   
};

CreateDynamicTable.prototype.enableSaveButton = function(cuurentEditButton) {
  cuurentEditButton.parent("td").replaceWith($("<td/>").append($("<button />").text("save").addClass("save")));
};

CreateDynamicTable.prototype.addTextBox = function(currentElement,classOfElement) {
  var inputElement = $("<input/>");
  currentElement.replaceWith(inputElement.val(currentElement.text()).addClass(classOfElement));
};

CreateDynamicTable.prototype.deleteRow = function(currentDeleteButton) {
  currentDeleteButton.closest("tr").remove();
};

CreateDynamicTable.prototype.enableEditDelete = function(currentSaveButton) {
  var editButton = $("<button />").text("Edit").addClass("edit"),
      deleteButton = $("<button />").text("Delete").addClass("delete");    
  currentSaveButton.replaceWith(editButton,deleteButton);
};

CreateDynamicTable.prototype.addLabel = function(currentElement,classOfElement) {
  var labelElement = $("<label/>");
    currentElement.replaceWith(labelElement.text(currentElement.val()).addClass(classOfElement));
};

CreateDynamicTable.prototype.saveText = function(currentSaveButton) {
  var emailTextElement = this.getRowElements(currentSaveButton,".email"),
      nameTextElement = this.getRowElements(currentSaveButton,".name");
  if(this.isNameValid(nameTextElement.val()) & this.isEmailValid(emailTextElement.val())) {
    this.enableEditDelete(currentSaveButton);
    this.addLabel(nameTextElement,"name");
    this.addLabel(emailTextElement,"email");    
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
    _this.deleteRow($(this));
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
class FormDataBuilder {
    constructor() {
      this.formData = new FormData();
    }
  
    addField(name, value) {
      this.formData.append(name, value);
      return this; // Return the instance for chaining
    }

    addMultipleFields(name, values) {
        values.forEach(value => this.formData.append(name, value));
        return this; // Return the instance for chaining
    }
  
    addFile(name, file) {
      this.formData.append(name, file);
      return this; // Return the instance for chaining
    }
  
    addMultipleFiles(name, files) {
      files.forEach(file => this.formData.append(name, file));
      return this; // Return the instance for chaining
    }
  
    build() {
      return this.formData; // Return the built FormData object
    }
  }

  export default FormDataBuilder;
  
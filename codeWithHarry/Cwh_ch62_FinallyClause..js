try {
    let a = 0;
    console.log(address);
    console.log("Program run successfully...")
} catch (error) {
    console.log("This is an error...")
    console.log(error.message)
} finally {               // finally block always run...
    console.log("I am a Finally Block i am always run...")
    // ----------finally use for do any work-----------
    // close the file
    // Exit the Lop
    // Write to the Log File
}
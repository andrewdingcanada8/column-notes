// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds. 
// 
// NOTE: Know that it *returns* the debounced function, which is what cannot 
// waits to be called. That is, to use in a component which will re-render 
// multiple times, you must persist the saved debounce function with a Hook.
// Example can be found in the Editor object.
type BounceFunction = (...args: any[]) => void

export const debounce = (func: BounceFunction, wait: number): BounceFunction => {
  //TODO: why is NodeJS here? (code from AUXPAD)
  // let timeout: NodeJS.Timeout;
  let timeout: any;

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  return function executedFunction(...args) {

    // The callback function to be executed after 
    // the debounce time has elapsed
    const later = () => {      
      // Execute the callback
      func(...args);
    };
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the 
    // inside of the previous setTimeout  
    clearTimeout(timeout);
    
    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs Node)
    timeout = setTimeout(later, wait);
  };
};
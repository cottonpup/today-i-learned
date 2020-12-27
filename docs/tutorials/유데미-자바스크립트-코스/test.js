const result = {
    success: ["max-length", "no-amd", "prefer-arrow-functions"],
    failure: ["no-var", "var-on-top", "linebreak"],
    skipped: ["no-extra-semi", "no-dup-keys"]
  };
  function makeList(arr) {
    // Only change code below this line
    let failureItems = '';

    failureItems = [`<li class="text-warning">${arr[0]}</li>
    <li class="text-warning">${arr[1]}</li>
    <li class="text-warning">${arr[2]}</li>`];
    // Only change code above this line
    return failureItems;
  }
  
  const failuresList = makeList(result.failure);
  console.log(failuresList);
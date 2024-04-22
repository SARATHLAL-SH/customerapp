export const VerifyPancardHandler = (text, setMessage, setError, setAge,Navigation) => {
    const panRegex = /Account Number Card\s*([\w\d]{10})/;
    const dobRegex = /Date of Birth\s*(\d{2}\/\d{2}\/\d{4})/;
  
    // Extract PAN card number and date of birth using regex
    const panMatch = text?.match(panRegex);
    const dobMatch = text?.match(dobRegex);
  
    // Check if matches exist and extract values
    const panNumber = panMatch ? panMatch[1] : 'Not found';
    const dob = dobMatch ? dobMatch[1] : 'Not found';
  
    console.log('PAN Card Number:', panNumber);
    console.log('Date of Birth:', dob);
    if (panNumber != 'Not found' && dob != 'Not found') {
      if (dobMatch) {
        // Split the date string into day, month, and year components
        const dobParts = dobMatch[1].split('/');
  
        const day = parseInt(dobParts[0].trim(), 10); // Convert to integer
        const month = parseInt(dobParts[1].trim(), 10); // Convert to integer
        const year = parseInt(dobParts[2].trim(), 10); // Convert to integer
  
        // Create a new date object
        const dobDate = new Date(year, month - 1, day); // Months are zero-based (0-11)
  
        // Check if dobDate is a valid date
        if (isNaN(dobDate.getTime())) {
          console.log('Invalid date string:', dobMatch[1]);
          setMessage(
            'Unable to recognize the text on your Aadhaar card. Please try again.',
          );
          setError(true);
          return; // Exit function if DOB is not a valid date
        }
  
        // Continue with calculating age
        const today = new Date();
        const diffTime = Math.abs(today - dobDate);
        const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
        setAge(age);
  
        //   console.log('Your age is:', age);
        if (age > 21) {
          setMessage('PanCard Uploaded Successfully');
          console.log('successfully updated')
          setTimeout(()=>{
           Navigation.reset({
              index: 0,
              routes: [{ name: 'Upload Selfie' }],
            });
          },1000)
          
        } else if (age < 21) {
          setMessage('You are not Eligible for Signin this Application');
        } else {
          setMessage('Unable to Read Your PanCard. Try Again');
        }
      }
    } else {
      setMessage('Unable to Read Your PanCard. Try Again');
    }
  };
  
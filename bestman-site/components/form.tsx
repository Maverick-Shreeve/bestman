interface FormProps {  //Props are arguments passed into react components
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    characterLimit: number;
  }
  
  const Form: React.FC<FormProps> = (props) => {
    const isPromptValid = props.prompt.length < props.characterLimit; //makes sure the words typed in doesnt exceed the limit 
    const updatePromptValue = (text: string) => {
      if (text.length <= props.characterLimit) {  // if legnth is less than or equal to limit it updates the prompt
        props.setPrompt(text);
      }
    };
  
    let statusColor = "text-slate-500";
    let statusText = null;
    if (!isPromptValid) {   //will block off sumbit button if over 32 characters
      statusColor = "text-red-400";
      statusText = `Input must be less than ${props.characterLimit} characters.`;
    }
  
    return (
      <>
        <div className="mb-6 text-slate-400">
          <p>
            Type in a keyword for your brand and I will generate some magic for you! --
              (AWS has been acting up so if it doesn't work in 4 seconds refresh and try another word! )
          </p>
        </div>
  
        <input // this is for our text box
          className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"
          type="text"  

          placeholder="ex: coffee, tesla, tea, pokemon, NBA, tools"

          value={props.prompt}
          onChange={(e) => updatePromptValue(e.currentTarget.value)}
        ></input>
        <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
          <div>{statusText}</div>
          <div>
            {props.prompt.length}/{props.characterLimit}
          </div>
        </div>
        <button
          className="bg-gradient-to-r from-teal-400 
          to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
          onClick={props.onSubmit}
          disabled={props.isLoading || !isPromptValid} // this disables the submit button if i submit or if prompt isnt valid
        >
          Submit
        </button>
      </>
    );
  };
  
  export default Form;
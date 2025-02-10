import "./BattleUserInput.scss";
import useBattleInput from "../../hooks/useBattleInput.jsx";

// eslint-disable-next-line react/prop-types
const BattleUserInput = ({index}) => {
    const {handleUsername, usernameRef, errorText, setErrorText} = useBattleInput(index)

    return <form className="battleUserInfoForm" onSubmit={handleUsername}>
        <p>Choose <b>Player {index + 1}</b> username</p>
        <input
            className={errorText ? "battleUserInfoInputError" : null}
            type="text"
            ref={usernameRef}
            onChange={() => setErrorText(null)}
            required
        />
        {errorText ? <p className={"battleUserInfoError"}>{errorText}</p> : null}
        <div className={"battleUserInfoSubmitButtonContainer"}>
            <button type="submit" className={"battleUserInfoSubmitButton"}>Submit</button>
        </div>
    </form>;
};

export default BattleUserInput;

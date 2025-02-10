import "./BattleUser.scss"
import {useContext} from "react";
import BattleContext from "../../contexts/BattleContext.jsx";

// eslint-disable-next-line react/prop-types
const BattleUser = ({index, userInfo}) => {
    const {reset} = useContext(BattleContext);
    const handleReset = () => {
        reset(index)
    }

    return <div className={"battleUserContainer"}>
        {userInfo.winner == null ? null : <h2>{userInfo.winner ? "Winner 🥳" : "Loser 🥵"}</h2>}
        <div className={"battleUserCardContainer"}>
            <img className={"battleUserImage"} src={userInfo.avatar_url} alt={"image"}/>
            <p className={"battleUserLogin"}>@{userInfo.login}</p>
            {userInfo.stars == null
                ? <div className={"battleUserButtonContainer"}>
                    <button className={"battleUserButton"} onClick={handleReset}>Reset</button>
                </div>
                : <div className={"battleUserRepoInfoContainer"}>
                    <p>Followers: {userInfo.followers}</p>
                    <p>Repositories stars: {userInfo.stars}</p>
                    <p>Total score: {userInfo.total}</p>
                </div>
            }
        </div>
    </div>
}

export default BattleUser;
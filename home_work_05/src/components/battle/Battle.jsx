import {useEffect, useState} from "react";
import BattleUser from "../battleuser/BattleUser.jsx";
import BattleUserInput from "../battleuserinput/BattleUserInput.jsx";
import "./Battle.scss"
import gitRepository from "../../repositories/gitRepository.js";
import BattleUsersContext from "../../context/BattleUsersContext.jsx";

const Battle = () => {
    const [userInfo1, setUserInfo1] = useState(null)
    const [userInfo2, setUserInfo2] = useState(null)

    const [userRepoInfo1, setUserRepoInfo1] = useState(null)
    const [userRepoInfo2, setUserRepoInfo2] = useState(null)

    useEffect(() => {
        setUserRepoInfo1(null)
    }, [userInfo1]);

    useEffect(() => {
        setUserRepoInfo2(null)
    }, [userInfo2]);

    const battle = async () => {
        console.log("battle!")
        try {
            const userRepoInfo1 = await getUserRepoInfo(userInfo1.login);
            setUserRepoInfo1(userRepoInfo1);
            const userRepoInfo2 = await getUserRepoInfo(userInfo2.login);
            setUserRepoInfo2(userRepoInfo2);
        } catch (e) {
            console.log(e);
        }
    }

    const getUserRepoInfo = async (username) => {
        try {
            return await gitRepository.getUserRepoInfo(username);
        } catch (e) {
            console.log(e);
        }
    }

    const restart = () => {
        setUserInfo1(null);
        setUserInfo2(null);
        setUserRepoInfo1(null);
        setUserRepoInfo2(null);
    }

    const reset = (playerName) => {
        if (playerName === "Player 1") {
            setUserInfo1(null);
            return;
        }
        if (playerName === "Player 2") {
            setUserInfo2(null);
            return;
        }
    }

    const submitUsername = async (playerName, username) => {
        try {
            const userInfo = await gitRepository.getUserInfo(username)
            console.table(userInfo);
            if (playerName === "Player 1") {
                setUserInfo1(userInfo);
                return;
            }
            if (playerName === "Player 2") {
                setUserInfo2(userInfo);
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }

    return <>
        <BattleUsersContext.Provider value={{}}>
            <div className={"battleContainer"}>
                <div className={"battleUsersContainer"}>
                    {userInfo1 == null
                        ? <BattleUserInput playerName={"Player 1"} submitUsername={submitUsername}/>
                        : <BattleUser
                            playerName={"Player 1"}
                            userInfo={userInfo1}
                            reset={reset}
                            userRepoInfo={userRepoInfo1}/>
                    }
                    {userInfo2 == null
                        ? <BattleUserInput playerName={"Player 2"} submitUsername={submitUsername}/>
                        : <BattleUser
                            playerName={"Player 2"}
                            userInfo={userInfo2}
                            reset={reset}
                            userRepoInfo={userRepoInfo2}/>
                    }
                </div>
                {userInfo1 != null && userInfo2 != null && userRepoInfo1 == null && userRepoInfo2 == null
                    ? <div className={"battleButtonContainer"}>
                        <button onClick={battle}>Battle!</button>
                    </div>
                    : null}
                {userRepoInfo1 != null && userRepoInfo2 != null
                    ? <div className={"battleRestartButtonContainer"}>
                        <button onClick={restart}>Restart 🔄</button>
                    </div>
                    : null}
            </div>
        </BattleUsersContext.Provider>
    </>
}

export default Battle;
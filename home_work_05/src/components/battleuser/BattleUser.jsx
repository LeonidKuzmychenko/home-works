import "./BattleUser.scss"

// eslint-disable-next-line react/prop-types
const BattleUser = ({index, userInfo, reset}) => {
    const handleReset = () => {
        reset(index)
    }

    return <div className={"battleUserContainer"}>
    {userInfo.winner == null? null: <h2>{userInfo.winner?"Winner":"Loser"}</h2>}
        <div className={"battleUserCardContainer"}>
            {/* eslint-disable-next-line react/prop-types */}
            <img className={"battleUserImage"} src={userInfo.avatar_url}/>
            {/* eslint-disable-next-line react/prop-types */}
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
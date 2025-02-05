import "./BattleUser.scss"

// eslint-disable-next-line react/prop-types
const BattleUser = ({playerName, userInfo, reset, userRepoInfo}) => {
    const handleReset = () => {
        reset(playerName)
    }

    const getFollowers = () =>{
        return userInfo.followers;
    }

    const getRepositoriesStars = () =>{
        return userRepoInfo.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    }

    const getTotalScore = () =>{
        return getFollowers() + getRepositoriesStars();
    }



    return <div className={"battleUserContainer"}>
        {/* eslint-disable-next-line react/prop-types */}
        <img className={"battleUserImage"} src={userInfo.avatar_url}/>
        {/* eslint-disable-next-line react/prop-types */}
        <p className={"battleUserLogin"}>@{userInfo.login}</p>
        {userRepoInfo == null
            ? <div className={"battleUserButtonContainer"}>
                <button className={"battleUserButton"} onClick={handleReset}>Reset</button>
            </div>
            : <div className={"battleUserRepoInfoContainer"}>
                <p>Followers: {getFollowers()} </p>
                <p>Repositories stars: {getRepositoriesStars()}</p>
                <p>Total score: {getTotalScore()}</p>
            </div>
        }
    </div>
}

export default BattleUser;
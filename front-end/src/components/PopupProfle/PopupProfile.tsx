import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './PopupProfile.scss'

const PopupProfile = () => {
    const [isPopupProfile, setIsPopupProfile] = useState(true);

    const handlePopupProfile = () => {
        setIsPopupProfile(false);
    }

    return (
        <>
            {isPopupProfile && <div className={"profile"}>
                <div className={"profile__container"}>
                    <div className={"profile__account"}>
                        <p>Account</p>
                        <div onClick={handlePopupProfile}>
                            <CloseOutlined/>
                        </div>
                    </div>
                    <div className={"profile__details"}>
                        <div className={"profile__avatar"}>Avatar</div>
                        <div className={"profile__username"}>Le Thai Phuc Bao</div>
                    </div>
                    <div className={"profile__button"}>
                        <button>Log out</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default PopupProfile;
import { useNostrProfile } from "components/apps/Messenger/ProfileContext";
import { useMemo } from "react";
import Button from "styles/common/Button";
import StyledProfileBanner from "components/apps/Messenger/StyledProfileBanner";
import { Back, Write } from "components/apps/Messenger/Icons";
import { UNKNOWN_PUBLIC_KEY } from "components/apps/Messenger/constants";
import { haltEvent } from "utils/functions";
import Profile from "components/apps/Messenger/Profile";
import { useNostr } from "nostr-react";
import { getWebSocketStatusIcon } from "components/apps/Messenger/functions";

const GRADIENT = "linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.5))";
const STYLING =
  "center center / cover no-repeat fixed border-box border-box #000";

type ProfileBannerProps = {
  goHome: () => void;
  newChat: () => void;
  publicKey: string;
  relayUrls: string[];
  selectedRecipientKey: string;
};

const ProfileBanner: FC<ProfileBannerProps> = ({
  goHome,
  newChat,
  publicKey,
  relayUrls,
  selectedRecipientKey,
}) => {
  const pubkey =
    selectedRecipientKey === UNKNOWN_PUBLIC_KEY
      ? ""
      : selectedRecipientKey || publicKey;
  const {
    banner,
    nip05,
    picture,
    userName = "New message",
  } = useNostrProfile(pubkey);
  const { connectedRelays } = useNostr();
  const connectedRelayData = useMemo(
    () =>
      Object.fromEntries(
        connectedRelays.map(({ url, status }) => [url, status])
      ),
    [connectedRelays]
  );
  const style = useMemo(
    () =>
      banner ? { background: `${GRADIENT}, url(${banner}) ${STYLING}` } : {},
    [banner]
  );

  return (
    <StyledProfileBanner onContextMenuCapture={haltEvent} style={style}>
      <Button onClick={selectedRecipientKey ? goHome : newChat}>
        {selectedRecipientKey ? <Back /> : <Write />}
      </Button>
      {!selectedRecipientKey && connectedRelays.length > 0 && (
        <ol>
          {relayUrls.sort().map((relayUrl) => (
            <li key={relayUrl} title={relayUrl}>
              {getWebSocketStatusIcon(connectedRelayData[relayUrl])}
            </li>
          ))}
        </ol>
      )}
      <Profile
        nip05={nip05}
        picture={picture}
        pubkey={pubkey}
        userName={userName}
      />
    </StyledProfileBanner>
  );
};

export default ProfileBanner;
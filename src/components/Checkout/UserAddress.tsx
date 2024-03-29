import MapMarkerIcon from "@assets/icons/MapMarker";

import styles from "@styles/components/checkout/UserAddress.module.css"

interface UserAddressProps {
	name: string;
	address: string;
}

export default function UserAddress(props: UserAddressProps) {
 
  return (
    <div className={styles.address}>
      <div className={styles.addressIcon}>
        <MapMarkerIcon />
      </div>

			<div>
				<h3 className={styles.addressName}>{props.name}</h3>

				<div className={styles.addressText}>
					{props.address}
				</div>
			</div>
    </div>
  );
}

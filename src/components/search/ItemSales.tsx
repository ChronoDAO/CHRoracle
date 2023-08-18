import styles from './ItemSales.module.scss';

type TypeItemSales = {
  price: number;
  date: string;
  toUser: string;
  fromUser: string;
  issuedId: string;
  itemName: string;
  imageUrl: string;
};

const ItemSales: React.FC<TypeItemSales> = ({
  price,
  date,
  toUser,
  fromUser,
  issuedId,
  itemName,
  imageUrl,
}) => {
  return (
    <div className={styles.itemSales}>
      <img src={imageUrl} alt={itemName} className={styles.imageDeVente} />
      <div>
        <p><strong>Article :</strong> {itemName}</p>
        <p><strong>Prix :</strong> {price}</p>
        <p><strong>Date :</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>De :</strong> {fromUser}</p>
        <p><strong>Vers :</strong> {toUser}</p>
      </div>
    </div>
  );
};

export default ItemSales;


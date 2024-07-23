import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import moment from "moment";
import { BUYER, shipayItems, ShipayPaymentCreate } from "@models/Product2";
import { Api } from "src/providers";

import { Grid } from "@mui/material";
import SmartImage from "@components/SmartImage";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function getTotalValue(items: shipayItems[]): number {
  return items.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );
}
interface props2 {
  buyer: BUYER;
  show: boolean;
  setPaymentData: any;
  items: shipayItems[];
  valorTotal: number
  valorFrete: number
}
export default function PIXCard(props: props2) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [iamgeSrc, setImageSrc] = React.useState<string>("");
  const [order_id, setOrderId] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("INICIADO");

  async function createPayment(buyer: BUYER, items: shipayItems[]) {
    // console.log({ buyer, items });
    let total = getTotalValue(items) + props.valorFrete;
    items.push({
      quantity: 1,
      unit_price: props.valorFrete,
      item_title: "FRETE",
      ean: "000000000000",
    })
    const paymentOrder: ShipayPaymentCreate = {
      buyer,
      callback_url: "https://api-smart-939610cb57d8.herokuapp.com/callback_shipay",
      wallet: "shipay-pagador",
      total,
      pix_dict_key: process.env.PIX_RECEBEDOR ?? "999999999999",
      order_ref: "PEDIDO TESTES",
      items,
    };
    var tk = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    if (tk == null) {
      tk = "";
    }
    const token: string = tk;
    const PIX_QR_CODE: any = await Api.post(
      "https://api-smart-939610cb57d8.herokuapp.com/create_payment",
      paymentOrder,
      { headers: { "x-access-token": token } }
    );
    if (PIX_QR_CODE) {
      setIsLoading(false);
      setImageSrc(PIX_QR_CODE.data.qr_code);
      setOrderId(PIX_QR_CODE.data.order_id);
    }
    getStatus(PIX_QR_CODE.data.order_id);
    //console.log({ PIX_QR_CODE });
  }

  async function getStatus(orderId: string) {
    setInterval(async () => {
      var tk = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      if (tk == null) {
        tk = "";
      }
      const token: string = tk;
      const PIX_QR_CODE: any = await Api.post(
        "https://api-smart-939610cb57d8.herokuapp.com/get_payment",
        { id: orderId },
        { headers: { "x-access-token": token } }
      );
      if (PIX_QR_CODE) {
        await props.setPaymentData({ data: PIX_QR_CODE.data })
        setStatus(PIX_QR_CODE.data.status);
      }
      //console.log({ PIX_QR_CODE });
    }, 5000);
  }

  React.useEffect(() => {
    if (props.show) {
      createPayment(props.buyer, props.items);
    }
  }, [props.show]);


  React.useEffect(() => {
    // console.log({ order_id })
  }, [order_id])

  return (
    <Card sx={{ maxWidth: 445, margin: "auto" }}>
      <CardHeader
        title={"Pagamento via PIX " + status}
        subheader={moment().format("DD/MM/YYYY HH:mm:ss")}
      />

      {isLoading ? (
        <Skeleton animation="wave" height={10} width="40%" />
      ) : (
        <>
          <CardContent>
            <Grid style={{ margin: "auto" }} item>
              <SmartImage src={iamgeSrc} width={400} height={400} objectFit={"contain"} layout={"responsive"} />
            </Grid>

            <hr />
            <Typography variant="body2" color="text.secondary">
              Pague utilizando o código acima.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Esta janelá irá fechar após a confirmação do seu pagamento!
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
}

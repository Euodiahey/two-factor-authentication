import React from "react";
import { api } from "~/utils/api";
import { Card } from "~/components/card";
import RootLayout from "~/layouts/layout";
import { Create } from "~/components/create";


export default function Home() {
  const [time, setTime] = React.useState<number>();
  const { data } = api.totp.getAll.useQuery();


  React.useEffect(() => {
    const seconds = new Date().getSeconds();
    setTime(seconds > 30 ? Math.abs(60 - seconds) : Math.abs(30 - seconds));
  }, [data]);

  return (
    <RootLayout >
      <Create />
      {data?.map((totp) => (
        <Card time={time!} key={totp.id} value={totp}>
          <span>{totp.issuer}</span>
        </Card>
      ))}
    </RootLayout>
  );
}

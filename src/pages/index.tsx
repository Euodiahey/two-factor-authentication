import RootLayout from "~/layouts/layout";
import { api } from "~/utils/api";

import { Card } from "~/components/card";
import { Create } from "~/components/create";

export default function Home() {
  const { data } = api.totp.getAll.useQuery();
  console.log(data);
  return (
    <RootLayout>
      <Create />
      <Card />
      <div>
        {data?.map((totp) => (
          <div key={totp.id}>{totp.secret}</div>
        ))}
      </div>
    </RootLayout>
  );
}

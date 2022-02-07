import { Race } from "@prisma/client";
import { Link } from "remix";

type Props = {
  race: Race;
};

export default function RaceComponent(props: Props) {
  const { race } = props;
  console.log("race", race);

  return (
    <h1>{race.id}</h1>
    // <div className="container pt-5 pl-5">
    //   <h1 className="title">Jyväskylän veneseuran</h1>

    //   <div className="p-3">
    //     <h2 className="subtitle is-4">2021 kilpailut</h2>
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th>Päivämäärä</th>
    //           <th>Kilpailu</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {races.map((race) => (
    //           <tr key={race.id}>
    //             <td>{race.date}</td>
    //             <td>
    //               <Link to={race.id}>{race.name}</Link>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}

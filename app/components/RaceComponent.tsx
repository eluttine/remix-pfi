import { Race, RaceLine, RaceStart } from "@prisma/client";
import { format } from "date-fns";
import { Link } from "remix";

type Props = {
  race: Race & {
    starts: (RaceStart & {
      raceLines: RaceLine[];
    })[];
  };
};

const formatHandicap = (value: number) => {
  return value.toString().replace(".", ",");
};

const formatTime = (value: string | null) => {
  if (!value) return "";
  return format(new Date(value), "H:mm:ss");
};

const formatDuration = (ms: number | null) => {
  if (!ms) return "";

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);

  const humanized = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  return humanized;
};

export default function RaceComponent(props: Props) {
  const { race } = props;
  const racelines = race.starts[0].raceLines;

  return (
    <div className="container pt-5 pl-5">
      <h1 className="title">{race.name}</h1>

      <div className="p-3">
        <h2 className="subtitle is-4">2021 kilpailut</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Sija</th>
              <th>Purjenumero</th>
              <th>Vene</th>
              <th>Tyyppi</th>
              <th>Finrating</th>
              <th>Maaliintuloaika</th>
              <th>Purjehdusaika</th>
              <th>Tasoitusaika</th>
            </tr>
          </thead>
          <tbody>
            {racelines.map((raceline) => (
              <tr key={raceline.id}>
                <td>{raceline.position}</td>
                <td>{raceline.boatSailnumber}</td>
                <td>{raceline.boatName}</td>
                <td>{raceline.boatModel}</td>
                <td>{formatHandicap(raceline.boatHandicap)}</td>
                <td>{formatTime(raceline.endTime)}</td>
                <td>{formatDuration(raceline.sailingDuration)}</td>
                <td>{formatDuration(raceline.handicapDuration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

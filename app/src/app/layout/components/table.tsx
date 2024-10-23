import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@hanzo/ui/primitives"

const luxData: {
  period: string
  LUXDistributed: string
  totalUSD: string
  effectivePrice: string
  closing: string
  yourUSD: string
  yourLUX: string
}[] = []
for (let i=1; i <= 369; i++){
  luxData.push({
    period: `#${i}`,
    LUXDistributed: "2,000,000",
    totalUSD: "12,000",
    effectivePrice: "0.000132",
    closing: "12 hours",
    yourUSD: "0.00 ",
    yourLUX: "0.00 ",
  })
}

export function LuxDataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-right">Period</TableHead>
          <TableHead className="text-right">LUX Distributed</TableHead>
          <TableHead className="text-right">Total USD</TableHead>
          <TableHead className="text-right">Effective Price</TableHead>
          <TableHead className="text-right">Closing</TableHead>
          <TableHead className="text-right">Your USD</TableHead>
          <TableHead className="text-right">Your LUX</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {luxData.map((lux) => (
          <TableRow key={lux.period}>
            <TableCell className="text-right">{lux.period}</TableCell>
            <TableCell className="text-right">{lux.LUXDistributed} LUX</TableCell>
            <TableCell className="text-right">{lux.totalUSD} USD</TableCell>
            <TableCell className="text-right">{lux.effectivePrice} USD/LUX</TableCell>
            <TableCell className="text-right">{lux.closing}</TableCell>
            <TableCell className="text-right">{lux.yourUSD} USD</TableCell>
            <TableCell className="text-right">{lux.yourLUX} LUX</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

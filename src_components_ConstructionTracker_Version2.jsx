import React, { useState } from 'react';

const projects = ["Home Build", "Interior Remodel", "Landscape"];
const locations = ["Lagos", "Abuja", "London"];
const categories = ["Paint", "Tile", "Plant", "Timber", "Plasterboard"];
const types = {
  Paint: ["Emulsion", "Gloss"],
  Tile: ["Ceramic", "Porcelain"],
  Plant: ["Shrubs", "Trees"],
  Timber: ["Framing", "Decking"],
  Plasterboard: ["Standard", "Moisture Resistant"],
};
const units = ["L", "m2", "each", "job"];
const suppliers = ["Dulux", "Crown", "TopTiles", "Local Nursery", "Travis Perkins"];
const bsStandards = ["BS EN 13300", "BS EN 14411", "BS 3936", "BS EN 520", "BS EN 14566"];

export default function ConstructionTracker() {
  const [log, setLog] = useState([]);
  const [entry, setEntry] = useState({
    date: '',
    project: projects[0],
    location: locations[0],
    category: categories[0],
    type: types[categories[0]][0],
    variant: '',
    supplier: suppliers[0],
    bsStandard: bsStandards[0],
    quantity: '',
    unit: units[0],
    unitPrice: '',
    notes: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setEntry(prev => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { type: types[value][0] } : {})
    }));
  }

  function addLog() {
    setLog(prev => [...prev, { ...entry, totalCost: entry.quantity * entry.unitPrice }]);
    setEntry({
      ...entry,
      date: '',
      variant: '',
      quantity: '',
      unitPrice: '',
      notes: '',
    });
  }

  return (
    <div>
      <h2>Home Construction: Interior & Landscape Tracker</h2>
      <div style={{display: 'flex', flexDirection: 'column', maxWidth: 400}}>
        <input type="date" name="date" value={entry.date} onChange={handleChange} />
        <select name="project" value={entry.project} onChange={handleChange}>{projects.map(p=><option key={p}>{p}</option>)}</select>
        <select name="location" value={entry.location} onChange={handleChange}>{locations.map(l=><option key={l}>{l}</option>)}</select>
        <select name="category" value={entry.category} onChange={handleChange}>{categories.map(c=><option key={c}>{c}</option>)}</select>
        <select name="type" value={entry.type} onChange={handleChange}>{types[entry.category].map(t=><option key={t}>{t}</option>)}</select>
        <input type="text" name="variant" placeholder="E.g. White 10L, 300x300mm" value={entry.variant} onChange={handleChange} />
        <select name="supplier" value={entry.supplier} onChange={handleChange}>{suppliers.map(s=><option key={s}>{s}</option>)}</select>
        <select name="bsStandard" value={entry.bsStandard} onChange={handleChange}>{bsStandards.map(bs=><option key={bs}>{bs}</option>)}</select>
        <input type="number" name="quantity" placeholder="Quantity" value={entry.quantity} onChange={handleChange} />
        <select name="unit" value={entry.unit} onChange={handleChange}>{units.map(u=><option key={u}>{u}</option>)}</select>
        <input type="number" name="unitPrice" placeholder="Unit Price" value={entry.unitPrice} onChange={handleChange} />
        <input type="text" name="notes" placeholder="Notes" value={entry.notes} onChange={handleChange} />
        <button onClick={addLog}>Add Entry</button>
      </div>
      <h3>Material Log</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Date</th><th>Project</th><th>Location</th><th>Category</th><th>Type</th><th>Variant</th>
            <th>Supplier</th><th>BS Standard</th><th>Quantity</th><th>Unit</th><th>Unit Price</th><th>Total Cost</th><th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {log.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.project}</td>
              <td>{row.location}</td>
              <td>{row.category}</td>
              <td>{row.type}</td>
              <td>{row.variant}</td>
              <td>{row.supplier}</td>
              <td>{row.bsStandard}</td>
              <td>{row.quantity}</td>
              <td>{row.unit}</td>
              <td>{row.unitPrice}</td>
              <td>{row.totalCost}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
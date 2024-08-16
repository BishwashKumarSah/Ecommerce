import React from "react";
import { WorldMap } from "react-svg-worldmap";
import "./WorldMapExample.css"; // Import CSS file

const WorldMapExample = ({ worldMapData }) => {

  const data = worldMapData;

  const tooltipTextFunction = (country) => {
    const countryData = data.find(
      (item) => item.country.toUpperCase() === country.countryCode
    );
    return countryData
      ? `${country.countryName} 
    

      \n\n

\n\n


      Sales: ${countryData.totalSales}
      \n\n\n
\n\n\n
\n\n\n
\n\n\n\n\n

      Profit:  $${countryData.totalProfit}
      
      `
      : `${country.countryName}No data available`;
  };

  const mapData = data.map((item) => ({
    country: item.country,
    value: item.totalSales,
  }));

  return (
    <div className="world_map_container" >
      <WorldMap      
        color="red"        
        size="lg"
        tooltipTextFunction={tooltipTextFunction}
        data={mapData}
      />
    </div>
  );
};

export default WorldMapExample;

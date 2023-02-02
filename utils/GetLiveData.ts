import {
  generateDigiKeyTable,
  generateMouserTableData,
  generateTableData,
} from "./TableGenerator";
import Papa from "papaparse";
import axios from "axios";
import fetchMouser, {
  fetchDigiKey,
  fetchFutureElectronics,
} from "./ApiHandlers";

interface liveDataProps {
  supplier: string;
  partnumbers: string[];
  isCsv?: boolean;
}
export async function getLiveManufacturerData({
  supplier,
  partnumbers,
  isCsv
}: liveDataProps) {
  if (supplier == "Molex") {
    try {
      if (!isCsv) {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            const response = await axios.get(
              `https://scrapper-backend.geniusmindzone.com:8000/molex/${keyword}`
            );

            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );

        const csv_data = Papa.unparse(rawData);
        const LiveData = generateTableData(rawData);
        return { csv_data, LiveData, failedData };

      } else {
        let rawData: any = [];
        let failedData: any = [];
        const response = await axios.post(
          `https://scrapper-backend.geniusmindzone.com:8000/molexList`, { parts: partnumbers }
        );
        console.log(response.data)
        if (response.data.length) {
          for (const iterator of response.data) {
            console.log(iterator)
            if (iterator && iterator.Results == "Found") {
              rawData = [...rawData, ...[iterator]];
            } else {
              failedData = [...failedData, iterator];
            }
          }
        }
        const csv_data = Papa.unparse(rawData);
        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };

      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  else if (supplier == "Newark Electronics Corporation") {
    try {
      // if (isCsv) {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          const response = await axios.get(
            `https://scrapper-backend.geniusmindzone.com/scrap_newark/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );

      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };

      // } else {
      //   let rawData: any = [];
      //   let failedData: any = [];
      //   const response = await axios.get(
      //     `https://scrapper-backend.geniusmindzone.com/scrap_newark/${partnumbers}`
      //   );
      //   console.log(response.data)
      //   if (response.data.length) {
      //     for (const iterator of response.data) {
      //       console.log(iterator)
      //       if (iterator && iterator.Results == "Found") {
      //         rawData = [...rawData, ...[iterator]];
      //       } else {
      //         failedData = [...failedData, iterator];
      //       }
      //     }
      //   }
      //   const csv_data = Papa.unparse(rawData);
      //   const LiveData = generateTableData(rawData);

      //   return { csv_data, LiveData, failedData };

      // }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  else if (supplier == "Festo") {
    try {
      // if (isCsv) {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          const response = await axios.get(
            `https://scrapper-backend.geniusmindzone.com/scrap_festo/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );

      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };

      // } else {
      //   let rawData: any = [];
      //   let failedData: any = [];
      //   const response = await axios.get(
      //     `https://scrapper-backend.geniusmindzone.com/scrap_festo/${partnumbers}`
      //   );
      //   console.log(response.data)
      //   if (response.data.length) {
      //     for (const iterator of response.data) {
      //       console.log(iterator)
      //       if (iterator && iterator.Results == "Found") {
      //         rawData = [...rawData, ...[iterator]];
      //       } else {
      //         failedData = [...failedData, iterator];
      //       }
      //     }
      //   }
      //   const csv_data = Papa.unparse(rawData);
      //   const LiveData = generateTableData(rawData);

      //   return { csv_data, LiveData, failedData };

      // }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  else if (supplier == "Murata Manufacturing Co") {
    try {
      // if (isCsv) {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          const response = await axios.get(
            `https://scrapper-backend.geniusmindzone.com/scrap_murata/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );

      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };

      // } else {
      //   let rawData: any = [];
      //   let failedData: any = [];
      //   const response = await axios.get(
      //     `https://scrapper-backend.geniusmindzone.com/scrap_murata/${partnumbers}`
      //   );
      //   console.log(response.data)
      //   if (response.data.length) {
      //     for (const iterator of response.data) {
      //       console.log(iterator)
      //       if (iterator && iterator.Results == "Found") {
      //         rawData = [...rawData, ...[iterator]];
      //       } else {
      //         failedData = [...failedData, iterator];
      //       }
      //     }
      //   }
      //   const csv_data = Papa.unparse(rawData);
      //   const LiveData = generateTableData(rawData);

      //   return { csv_data, LiveData, failedData };

      // }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  else if (supplier == "Texas Instruments") {
    try {
      // if (!isCsv) {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          const response = await axios.get(
            `https://scrapper-backend.geniusmindzone.com/scrap_ti/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );

      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };

      // } else {
      //   let rawData: any = [];
      //   let failedData: any = [];
      //   const response = await axios.get(
      //     `https://scrapper-backend.geniusmindzone.com/scrap_ti/${partnumbers}`
      //   );
      //   console.log(response.data)
      //   if (response.data.length) {
      //     for (const iterator of response.data) {
      //       console.log(iterator)
      //       if (iterator && iterator.Results == "Found") {
      //         rawData = [...rawData, ...[iterator]];
      //       } else {
      //         failedData = [...failedData, iterator];
      //       }
      //     }
      //   }
      //   const csv_data = Papa.unparse(rawData);
      //   const LiveData = generateTableData(rawData);

      //   return { csv_data, LiveData, failedData };

      // }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  else if (supplier == "3M Company") {
    try {
      // if (!isCsv) {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          const response = await axios.get(
            `https://scrapper-backend.geniusmindzone.com/scrap_3m/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );

      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);
      return { csv_data, LiveData, failedData };

      // }
      // else {
      //   let rawData: any = [];
      //   let failedData: any = [];
      //   const response = await axios.get(
      //     `https://scrapper-backend.geniusmindzone.com/scrap_3m/${partnumbers}`
      //   );
      //   console.log(response.data, "---in response 3m ----")
      //   if (response.data.length) {
      //     for (const iterator of response.data) {
      //       console.log(response.data)
      //       if (response.data && response.data[0].Results == "Found") {
      //         console.log("in conditioin itrator----")
      //         rawData = [...rawData, ...[response[0].data]];
      //       } else {
      //         failedData = [...failedData, response[0].data];
      //       }
      //     }
      //   }
      //   const csv_data = Papa.unparse(rawData);
      //   console.log(" req data", rawData)
      //   const LiveData = generateTableData(rawData);

      //   return { csv_data, LiveData, failedData };

      // }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  else if (supplier == "Maxim Integrated") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        partnumber = partnumber.replace(/\//g, ":");
        const response = await axios.get(
          `https://scrapper-backend.geniusmindzone.com/maxim/${partnumber}`
        );
        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    console.log(LiveData);
    return { csv_data, LiveData, failedData };
  }
  else if (supplier.toLowerCase() == "onsemi") {
    try {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          const response = await axios.get(
            `https://scrapper-backend.geniusmindzone.com/onsemi/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );
      const csv_data = Papa.unparse(rawData);

      const LiveData = generateTableData(rawData);
      console.log(LiveData);
      return { csv_data, LiveData, failedData };
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier.toLowerCase() == "omron") {
    try {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          const response = await axios.get(
            `https://scrapper-backend.geniusmindzone.com/omron/${keyword}`
          );

          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );
      const csv_data = Papa.unparse(rawData);

      const LiveData = generateTableData(rawData);
      console.log(LiveData);

      return { csv_data, LiveData, failedData };
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "Wago") {
    try {
      let rawData: any = [];
      let failedData: any = [];
      await Promise.all(
        partnumbers.map(async (keyword: string) => {
          const response = await axios.get(
            `https://scrapper-backend.geniusmindzone.com/wago/${keyword}`
          );
          if (response && response.data.status !== 404) {
            rawData = [...rawData, ...[response.data]];
          } else {
            failedData = [...failedData, keyword];
          }
        })
      );
      const csv_data = Papa.unparse(rawData);

      const LiveData = generateTableData(rawData);
      console.log(LiveData);

      return { csv_data, LiveData, failedData };
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else if (supplier == "TE") {
    if (!isCsv) {
      try {
        let rawData: any = [];
        let failedData: any = [];
        await Promise.all(
          partnumbers.map(async (keyword: string) => {
            const response = await axios.get(
              // `https://scrapper-backend.geniusmindzone.com/te/${keyword}`
              `https://scrapper-backend.geniusmindzone.com/te/${keyword}`

            );
            if (response && response.data.status !== 404) {
              rawData = [...rawData, ...[response.data]];
            } else {
              failedData = [...failedData, keyword];
            }
          })
        );
        const csv_data = Papa.unparse(rawData);

        const LiveData = generateTableData(rawData);

        return { csv_data, LiveData, failedData };
      } catch (error) {
        throw new Error(`${error}`);
      }

    } else {
      let rawData: any = [];
      let failedData: any = [];
      const response = await axios.post(
        // `https://scrapper-backend.geniusmindzone.com/teList`, { parts: partnumbers }
        `https://scrapper-backend.geniusmindzone.com/teList`, { parts: partnumbers }
      );
      console.log(response.data)
      if (response.data.length) {
        for (const iterator of response.data) {
          console.log(iterator)
          if (iterator && iterator.Results == "Found") {
            rawData = [...rawData, ...[iterator]];
          } else {
            failedData = [...failedData, iterator];
          }
        }
      }
      const csv_data = Papa.unparse(rawData);
      const LiveData = generateTableData(rawData);

      return { csv_data, LiveData, failedData };

    }
  } else if (supplier == "Phoenix") {
    // alert("wow")
    let rawData: any[] = [];
    let failedData: any = [];
    const getData = async (index) => {
      const partnumber = partnumbers[index];
      const response = await axios.get(
        `https://scrapper-backend.geniusmindzone.com/phoenix/${partnumber}`
      );
      if (response && response.data.status !== 404) {
        rawData = [...rawData, ...[response.data]];
      } else {
        failedData = [...failedData, partnumber];
      }
      if (index < (partnumbers.length - 1)) {
        await getData(index + 1);
      }
    }
    await getData(0)
    // return console.log(partnumbers)
    // await Promise.all(
    //   partnumbers.map(async (partnumber) => {
    //     const response = await axios.get(
    //       `https://scrapper-backend.geniusmindzone.com/phoenix/${partnumber}`
    //     );
    //     console.log(response.data);
    //     if (response && response.data.status !== 404) {
    //       rawData = [...rawData, ...[response.data]];
    //     } else {
    //       failedData = [...failedData, partnumber];
    //     }
    //   })
    // );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    return { csv_data, LiveData, failedData };
  }
}

export async function getLiveDistributersData({
  supplier,
  partnumbers,
}: liveDataProps) {
  if (supplier == "Mouser") {
    let rawData: any[] = [];
    let failedData: any = [];
    for (let partnumber of partnumbers) {
      const response = await axios.get(
        `https://scrapper-backend.geniusmindzone.com/mouser/${partnumber}`
      );
      if (response && response.data.status !== 404) {
        rawData = [...rawData, ...[response.data]];
      } else {
        failedData = [...failedData, partnumber];
      }
    }

    const csv_data = Papa.unparse(rawData);
    const LiveData = generateMouserTableData(rawData);

    return { csv_data, LiveData, failedData };
  } else if (supplier == "Digikey") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        const response = await fetchDigiKey(partnumber);
        if (response && response?.status != "not found") {
          rawData = [...rawData, ...response];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateDigiKeyTable(rawData);
    return { csv_data, LiveData, failedData };
  } else if (supplier.toLowerCase() == "arrow") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        const response = await axios.get(
          `https://scrapper-backend.geniusmindzone.com/arrow/${partnumber}`
        );
        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    console.log(LiveData);
    return { csv_data, LiveData, failedData };
  } else if (supplier == "Maxim") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        partnumber = partnumber.replace(/\//g, ":");
        const response = await axios.get(
          `https://scrapper-backend.geniusmindzone.com/maxim/${partnumber}`
        );
        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    console.log(LiveData);
    return { csv_data, LiveData, failedData };
  } else if (supplier == "Rs-components") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        const response = await axios.get(
          `https://scrapper-backend.geniusmindzone.com/rscomponents/${partnumber}`
        );

        if (response && response.data.status !== 404) {
          rawData = [...rawData, ...[response.data]];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    return { csv_data, LiveData, failedData };
  } else if (supplier == "Future Electronics") {
    let rawData: any[] = [];
    let failedData: any = [];
    await Promise.all(
      partnumbers.map(async (partnumber) => {
        const response = await fetchFutureElectronics(partnumber);
        console.log("herr", response);
        if (response && response[0]) {
          rawData = [...rawData, ...response];
        } else {
          failedData = [...failedData, partnumber];
        }
      })
    );
    const csv_data = Papa.unparse(rawData);
    const LiveData = generateTableData(rawData);
    console.log(LiveData);
    return { csv_data, LiveData, failedData };
  }
}

interface LiveDataProps {
  type: string;
  supplier: string;
  partnumbers: string[];
  isCsv?: boolean
}

export default async function GetLiveData({
  type,
  supplier,
  partnumbers,
  isCsv
}: LiveDataProps) {
  if (type.toLowerCase() === "manufacturer") {
    const response = await getLiveManufacturerData({ supplier, partnumbers, isCsv });

    return response;
  } else {
    const response = await getLiveDistributersData({ supplier, partnumbers });
    return response;
  }
}

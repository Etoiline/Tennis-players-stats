/* recupérer les données du fichier json et retourner les données sélectionnées */
const URLdata = './data.json'

// retourne le contenu du fichier json
const fetchData = async () => {
  let data = null
  try {
    const response = await fetch(URLdata)
    data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}



/**
 * fonction à lancer à l'ouverture de la page
 */
async function init() {
  // Récupère les datas
  const data = await fetchData()
  displayChart(data)
}




/**
 * 
 * @param {donnees} d 
 * @returns le maximum des données (pour l'échelle)
 */
function calculateMax(d) {
  let max = 0
  d.forEach(element => {
    if (element.win > max) {
      max = element.win
    }
    if (element.loss > max) {
      max = element.loss
    }
  });
  return max
}




/**
 * Function creating tooltip winData
 * @param data : données
 */
function createTooltipWinData(data) {
  // Define the div for the tooltip
  let divTooltipWin = d3.selectAll('#svg')
  data.forEach((d, i) => {
    let div = divTooltipWin.append('g')
      .attr('id', `playerWin${i}`)
    div.append("svg:rect")
      .attr("opacity", "0")
      .attr("width", 200)
      .attr("height", 70)
      .attr("fill", "#000")
      .attr("class", "rectWin")
    div.append("svg:text")
      .attr('opacity', '0')
      .attr("width", 70)
      .attr("dy", "0em")
      .attr("height", 6)
      .attr("fill", "white")
      .attr("class", "textWin")
      .text(d.name + " - wins")
    div.append("svg:text")
      .attr('opacity', '0')
      .attr("width", 70)
      .attr("height", 6)
      .attr("dy", "1.2em")
      .attr("fill", "white")
      .attr("class", "textWin")
      .text("Total game : " + (d.win + d.loss))
    div.append("svg:text")
      .attr('opacity', '0')
      .attr("width", 70)
      .attr("height", 6)
      .attr("dy", "2.4em")
      .attr("fill", "white")
      .attr("class", "textWin")
      .text("Percentage win : " + (((d.win * 100) / (d.win + d.loss))).toFixed(2))
  })

}







/**
* Function creating tooltip lossData
*/
function createTooltipLossData(data) {
  // Define the div for the tooltip
  let divTooltipWin = d3.selectAll('#svg')
  data.forEach((d, i) => {
    let div = divTooltipWin.append('g')
      .attr('id', `playerLoss${i}`)
    div.append("svg:rect")
      .attr("opacity", "0")
      .attr("width", 200)
      .attr("height", 70)
      .attr("fill", "#000")
      .attr("class", "rectWin")
    div.append("svg:text")
      .attr('opacity', '0')
      // .attr('x', 600)
      .attr("width", 70)
      // .attr("y", 25+19*i)
      .attr("dy", "0em")
      .attr("height", 6)
      .attr("fill", "white")
      .attr("class", "textLoss")
      .text(d.name + " - losses")
    div.append("svg:text")
      .attr('opacity', '0')
      .attr("width", 70)
      .attr("height", 6)
      .attr("dy", "1.2em")
      .attr("fill", "white")
      .attr("class", "textWin")
      .text("Total game : " + (d.win + d.loss))
    div.append("svg:text")
      .attr('opacity', '0')
      .attr("width", 70)
      .attr("height", 6)
      .attr("dy", "2.4em")
      .attr("fill", "white")
      .attr("class", "textLoss")
      .text("Percentage win : " + (((d.loss * 100) / (d.win + d.loss))).toFixed(2))

  })

}






/**
 * Function creating loss bars 
 * 
 * @param chart : main chart
 * @param data : data to display
 * 
 *    
 */
function createLossBars(chart, data, max, offset) {
  var lossBars = chart.append('g')
    .attr('id', 'lossBars');

  const yScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([30, 380])

  const xScale = d3.scaleLinear()
    .domain([0, max])
    //.range([0, 760])
    .range([0, 330])

  data.forEach((d, i) => {
    lossBars.append("rect")
      .attr("class", "lossbar")
      .attr('x', 480 - xScale(d))
      .attr("width", xScale(d))
      .attr("y", yScale(i))
      .attr("height", 6)
      .attr("fill", "orange")
      .on("mousemove", function (event) {
        d3.selectAll(`#playerLoss${i} > text`)
          .attr("opacity", "1")
          .attr("x", d3.pointer(event)[0] + 20)
          .attr("y", d3.pointer(event)[1])
        d3.selectAll(`#playerLoss${i} > rect`)
          .attr("opacity", ".6")
          .attr("x", d3.pointer(event)[0] + 15)
          .attr("y", d3.pointer(event)[1] - 20)
      })
      .on("mouseout", function (d) {
        d3.selectAll(`#playerLoss${i} > text`)
          .attr("opacity", "0")
          .attr("x", "0")
          .attr("y", "0")
        d3.selectAll(`#playerLoss${i} > rect`)
          .attr("opacity", "0")
          .attr("x", "0")
          .attr("y", "0")
      });

  })



  // lossBars.selectAll(".bar")
  // .data(data)
  // .enter().append("rect")
  // .attr("class", "lossbar")
  // .attr('x', (d, i) => 415-xScale(d))
  // .attr("width", (d)=>xScale(d))
  // .attr("y", (d, i) => yScale(i))
  // .attr("height", 6)
  // .attr("fill", "orange")
}










/**
* Function creating win bars 
* 
* @param chart : main chart
* @param data : data to display
* 
*    
*/
function createWinBars(chart, data, max) {
  // Define the div for the tooltip
  var winBars = chart.append('g')
    .attr('id', 'winBars');
  const yScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([30, 380])

  const xScale = d3.scaleLinear()
    .domain([0, max])
    // .range([0, 380])
    .range([0, 330])

  data.forEach((d, i) => {
    winBars.append("rect")
      .attr("class", "winbar")
      .attr('x', 480)
      .attr("width", xScale(d))
      .attr("y", yScale(i))
      .attr("height", 6)
      .attr("fill", "purple")
      .on("mousemove", function (event) {
        d3.selectAll(`#playerWin${i} > text`)
          .attr("opacity", "1")
          .attr("x", d3.pointer(event)[0] + 20)
          .attr("y", d3.pointer(event)[1])
        d3.selectAll(`#playerWin${i} > rect`)
          .attr("opacity", ".6")
          .attr("x", d3.pointer(event)[0] + 15)
          .attr("y", d3.pointer(event)[1] - 20)
      })
      .on("mouseout", function (d) {
        d3.selectAll(`#playerWin${i} > text`)
          .attr("opacity", "0")
          .attr("x", "0")
          .attr("y", "0")
        d3.selectAll(`#playerWin${i} > rect`)
          .attr("opacity", "0")
          .attr("x", "0")
          .attr("y", "0")
      });

  })


}






/**
* Function creating ordinate 
* 
* @param chart : main chart
* @param data : data to display
* 
*    
*/
function createOrdinate(chart, data) {
  // Define the div for the tooltip
  var ordinate = chart.append('g')
    .attr('id', 'ordinate');
  const yScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([30, 380])

  data.forEach((d, i) => {
    ordinate.append("svg:text")
      .attr("class", "ordinate")
      .attr('x', 0)
      .attr("width", 20)
      .attr("y", yScale(i) + 8)
      .attr("height", 6)
      .attr("fill", "black")
      .attr("font-size", "0.9em")
      .text(d.name)


  })


}












function displayChart(data) {
  console.log('displaychart', data)
  let lossData = []
  let winData = []
  let names = []
  data.forEach((d) => {
    lossData.push(d.loss)
    winData.push(d.win)
    names.push(d.name)
  })

  const max = calculateMax(data)
  const offset = 150


  const margin = { top: 20, right: 20, bottom: 90, left: 20 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .range([height, 0]);

  //Main container
  const svg = d3.select("#container").append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)


  //axe ordonnée 1
  svg.append("line")
    .attr("x1", 150)
    .attr("y1", 10)
    .attr("x2", 150)
    .attr("y2", 400)
    .attr("stroke", "#000")

  //abscissa coordinates

  // Create scale
  var scale = d3.scaleLinear()
    .domain([-(max + 2), max + 2])
    .range([offset, width - offset]);
  var x_axis = d3.axisBottom()
    .scale(scale);
  svg.append("g")
    .attr("transform", "translate(0," + (height + 10) + ")")
    .call(x_axis)


  createOrdinate(svg, data, max + 2)
  createLossBars(svg, lossData, max + 2, offset)
  createWinBars(svg, winData, max + 2)
  createTooltipWinData(data)
  createTooltipLossData(data)



}

init()
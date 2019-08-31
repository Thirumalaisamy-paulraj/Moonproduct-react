import React, { Component } from 'react'

class Products extends Component {
    imageClick = () => {
        this.state.shown="none";
        console.log(this.state.shown);
      } 
      toggle() {
		this.setState({
			shown: !this.state.shown
		});
	} 

    constructor() {
        super()
        this.state = {
            clicks:0,
            productName: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {

    }
    IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
      }
      DecreaseItem = () => {
        this.setState({ clicks: this.state.clicks - 1 });
      }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })


    }

    handleClick() {
        console.log("state", this.state)
        const prodName = {
            "search": this.state.productName
        }
        console.log(prodName)
        fetch('http://beta-zepnur.teve.cloud/v2/search?page=0', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-anonymous': 'zepnur',
                'x-cloud-id': '1002'

            },
            body: JSON.stringify(prodName)
        }).then(res => res.json()).then(res => {
            this.setState({ ...res.search_result })
        })
        

    }

    render() {
        var shown = {
			display: this.state.shown ? "block" : "none"
		};
        return (
        <div>
            <div class="topnav">
                <h1 align='center'><img src='data:image/png;base64,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'></img></h1>
  <a class="active" href="#home">Home</a>
  <a href="https://beta-zepnur.teve.cloud/v2/search?page=0&Dental">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>

                <br></br>
                {console.log(this.state)}
                <div class="center container">
                <input
                   align="center"
                    type="text"
                    name="productName"
                    value={this.props.productName}
                    onChange={this.handleChange}
                    placeholder="Enter the Product Name"
                />
                <button type="submit btn-success " onClick={this.handleClick} >Search </button>
                </div>
                <div className="d-flex justify-content-around flex-wrap" >
                {this.state.hits && this.state.hits.hits.map(hit =>    
                <div className="products w-25 h-0 m-5">
                    <div className="prodName">
                        {hit._source.inventory_name}
                    </div>
                    <div className="image">
                         <img src={'https://api.zepnurhealth.com/image/' + hit._source.sku_image.split(",")[0] + '?token=eyJzaXplIjoieDMwMCIsImNsb3VkX2lkIjoiMTAwMiJ9'} width="300" height="300" onClick={this.toggle.bind(this)}/>
                    </div>
                    <div style={ shown } >
                        Description:
                        <div  className="" > {hit._source.description } </div>
                        
                        <button onClick={this.IncrementItem}><img src={"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.symbols.com%2Fgi.php%3Ftype%3D1%26id%3D1608%26imgrefurl=https%3A%2F%2Fwww.symbols.com%2Fsymbol%2Faddition%26docid=8U_Gn6I1d3PjlM%26tbnid=Oyo_GaiOm2A23M%3A%26vet=10ahUKEwjZ87CpnavkAhVTAXIKHZ3LDpYQMwhpKAgwCA..i%26w=500%26h=500%26bih=657%26biw=1366%26q=image%20of%20addition%20sign%26ved=0ahUKEwjZ87CpnavkAhVTAXIKHZ3LDpYQMwhpKAgwCA%26iact=mrc%26uact=8"} alt="+"></img></button>
                        <h2> { this.state.clicks }</h2>
                        <button onClick={this.DecreaseItem}>Remove from cart</button>
                    </div>
                </div>
                )}
                </div>

            </div>
        )
    }
}


export default Products

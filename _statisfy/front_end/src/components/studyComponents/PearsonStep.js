import Latex from "react-latex-next";

export default function PearsonStep(props){
    const pr = "$$r = \\frac{\\sum{(x_i-\\bar{x})\\sum{(y_i-\\bar{y})}}}{\\sqrt{\\sum{(x_i-\\bar{x})^2} \\sum{y_i-\\bar{y})^2}}}$$";
    const vars = {};

    props.variables.map(([var_name, var_value]) => {
        vars[var_name] = var_value;
    });

    return(
        <div>
            <p>The Pearson R correlation <Latex>{"$r$"}</Latex> is equal to the formula:</p>

            <Latex strict>{pr}</Latex>

            <h4>Step 1</h4>
            <p>
                <b>1.1 </b>
                Compute for the sum of the difference of each datapoint <Latex>$x_i$</Latex>, <Latex>$y_i$</Latex> and the mean of the variables <Latex>{"$x$"}</Latex>, <Latex>{"$y$"}</Latex> denoted 
                by <Latex>{"$\\bar{x}$"}</Latex>, <Latex>{"$\\bar{y}$"}</Latex>.
            </p>

            <Latex strict>
                {
                    "$$\\sum{(x_i-\\bar{x})}\\sum{(y_i-\\bar{y})}$$"
                }
            </Latex>

            <p>
                <b>1.2 </b>
                The mean of 
                variables <Latex>{"$x$"}</Latex>, <Latex>{"$y$"}</Latex> are <Latex>{'$' + `${Number(vars['X Mean']).toFixed(4)}` + '$'}</Latex> and <Latex>{'$' + `${Number(vars['Y Mean']).toFixed(4)}` + '$'}</Latex> respectively.
            </p>

            <p>
                Plug in the mean of <Latex>{"$x$"}</Latex> and the mean of <Latex>{"$y$"}</Latex> to the equation above.
            </p>

            <Latex strict>
                {
                    "$$" + "\\sum{(x_i-" + `${Number(vars['X Mean']).toFixed(4)}` + ")}" + "\\sum{(y_i-" + `${Number(vars['Y Mean']).toFixed(4)}` + ")}" + "$$"
                }
            </Latex>

            <p>
                <b>1.3 </b>
                Subsitute each datapoint for <Latex>{"$\\bar{x}$"}</Latex> and <Latex>{"$\\bar{y}$"}</Latex> at index <Latex>{"$i$"}</Latex> and subtract it to the mean of the 
                respective variables.
            </p>

            <p>
                <b>1.4 </b>
                Calculate the summation of each term and multiply it with each other.
            </p>

            <p>
                The resulting answer for <b>Step 1</b> would be <Latex>{'$' + `${Number(vars['Numerator']).toFixed(4)}` + '$'}</Latex>.
            </p>


            <h4>Step 2</h4>

            <p>
                <b>2.1 </b>
                Subtract each datapoint of variables <Latex>{"$x$"}</Latex> and <Latex>{"$y$"}</Latex> to their mean <Latex>{"$\\bar{x}$"}</Latex> and <Latex>{"$\\bar{y}$"}</Latex> and square it.
            </p>

            <Latex strict>
                {
                    "$$\\sum{(x_i-" + `${Number(vars['X Mean']).toFixed(4)}` + ")^2}" + "\\sum{(y_i-" + `${Number(vars['Y Mean']).toFixed(4)}` + ")^2}$$"
                }
            </Latex>

            <p>
                <b>2.2 </b>
                Square the results of <b>2.1</b> and calculate the summation. This is called the <b>Sum of Squares</b> of <Latex>{"$x$"}</Latex> and Sum of Squares of <Latex>{"$y$"}</Latex>. This gives the values:
            </p>

            <Latex strict>
                {
                    "$$\\sum{(x_i-" + `${Number(vars['X Mean']).toFixed(4)}` + ")^2} = " + `${Number(vars['SSx']).toFixed(4)}` +"$$"
                }
            </Latex>

            <Latex strict>
                {
                    "$$\\sum{(y_i-" + `${Number(vars['Y Mean']).toFixed(4)}` + ")^2} = " + `${Number(vars['SSy']).toFixed(4)}` + "$$"
                }
            </Latex>

            <p>
                <b>2.3 </b>
                Calculate the square root of the product of both <b>Sum of Squares</b> of <Latex>{"$x$"}</Latex> and Sum of Squares of <Latex>{"$y$"}</Latex>.
            </p>

            <Latex strict>
                {
                    "$$ \\sqrt{" + "\\sum{(x_i-" + `${Number(vars['X Mean']).toFixed(4)}` + ")^2}" + "\\sum{(y_i-" + `${Number(vars['Y Mean']).toFixed(4)}` + ")^2}}$$"
                }
            </Latex>

            <Latex>
                {
                    "$$ \\sqrt{(" + `${Number(vars['SSx']).toFixed(4)}` + ")(" + `${Number(vars['SSy']).toFixed(4)}` + ")}$$"
                }
            </Latex>

            The resulting answer of <b>Step 2</b> would be <Latex>{'$' + `${Number(vars['Denominator']).toFixed(4)}` + '$'}</Latex>.

            <h4>Step 3</h4>
            <p>
                <b>3.1 </b>
                To get the R Correlation value <Latex>{"$r$"}</Latex>, divide the answer for <b>Step 1</b> to the answer of <b>Step 2</b>.
            </p>

            <Latex>
                {
                    "$$r = " + "\\frac{" + `${Number(vars['Numerator']).toFixed(4)}` + "}{" + `${Number(vars['Denominator']).toFixed(4)}` + "}$$"
                }
            </Latex>

            <p>
                The resulting answer will be the R Correlation value <Latex>{"$r$"}</Latex> which is equal to <Latex>{"$\\boxed{" + `${Number(vars['R Coefficient']).toFixed(4)}` + "}$"}</Latex>.
            </p>
        </div>
    )
}
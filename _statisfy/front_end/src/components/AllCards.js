import Card from "./Card";

export default function AllCards(){

   // const attributes = props.attribute

    return(
        <div className ="upload_body">
            <Card
                title = "Descriptive Univariate Statistics"
                desc = "desc"
                attributes={["one variable", "interval","ratio","ordinal","nominal","grouped", "ungrouped", "univariate data analysis"]}
            />
            <Card
                title = "Chi-Squared Test for Association"
                desc = "desc"
                attributes={["two variables", "nominal", "ungrouped", "relationship"]}
            />
            <Card
                title = "Chi-Squared Goodness of Fit Test"
                desc = "desc"
                attributes={["one variable", "nominal", "ungrouped", "relationship"]}
            />
            <Card
                title = "PearsonR"
                desc = "desc"
                attributes={["two variables", "interval","ratio", "ungrouped", "relationship"]}
            />
            <Card
                title = "Spearman Rho Rank Correlation Test"
                desc = "desc"
                attributes={["two variables", "ordinal", "ungrouped", "relationship"]}
            />

            <Card
                title = "One-way ANOVA"
                desc = "desc"
                attributes={["interval","ratio", "one independent variable", "three or more groups", "significant differences"]}
            />

            <Card
                title = "Two-way ANOVA"
                desc = "desc"
                attributes={["interval","ratio", "two independent variables", "three or more groups", "significant differences"]}
            />

            <Card
                title = "Kruskal-Wallis Rank Sum Test"
                desc = "desc"
                attributes={["interval","ratio","ordinal", "one independent variable", "three or more groups", "significant differences"]}
            />

            <Card
                title = "Wilcoxon-Mann-Whitney Rank Sum Test"
                desc = "desc"
                attributes={["ordinal", "one independent variable", "two groups", "significant differences"]}
            />
            <Card
                title = "Multiple Regression"
                desc = "desc"
                attributes={["three or more variables", "interval","ratio","ordinal","nominal","relationship"]}
            />
        </div>
        
    ); 
}
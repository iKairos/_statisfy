export const instDataPage = [
    ["1", "Upload a dataset that is in comma-separated values (CSV) format. Make sure the file is well partitioned by delimiters to avoid any errors."],
    ["2", "After uploading, view the table below to review your dataset."],
    ["3", "In the columns tab, review each columns' data. Here, you can see how much data is valid and missing. You can also see the basic univariate analysis of each column."],
    ["4", "After reviewing each column, tick all the columns you want to use in your statistical analysis."],
    ["5", "Next, you may clean your dataset if it contains missing values to improve statistical accuracy and integrity."],
    ["6", "If you are done reviewing your data, hit next to select a statistical tool for you dataset."]
];

export const tooltipDelimiter = "A delimiter determines the partitioning of every data per column in a dataset. It is an indicator of separation between data points. The default delimiter for CSV files is a comma ','.";

export const tooltipDataset = "A dataset is a collection of interrelated information that can be analyzed by means of data analysis, statistics, and machine learning. The system only accepts comma-separated values (CSV) as file extension for datasets for uniformity.";

export const stepsString = [
    'Name your research.',
    'Upload and configure your dataset.',
    'Verify your choices.'
];

export const studyStepsString = [
    'Name your Study.',
    'Select appropriate tool',
    'Select columns of data to be processed.'
];

export const passwordRequirement = "Password should be at least eight characters, has at least one uppercase letter, one lowercase letter, one number and one special character.";

export const status500 = "Request from server returned an error status 500. The server might be offline or down, please try again later.";

export const researchSuccessTitle = "Research created successfully!";
export const researchSuccess = "You may now view and customize your research. Proceed by creating a study, which selects certain colums for you to analyze by our preset statistical or machine learning methods.";

export const variableTooltip = {
    'R Coefficient': 'R Coefficient determines the strength of linear relationship of the two variables. The closer it is to 1.0, the higher the strength of the relationship is. If the coefficient is positive that means the relationship has an upward trend and if the coefficient is negative that means the relationship has a downward trend.',
    'P-value': 'P-value tells the probability of obtaining results at least as extreme as the observed results of a statistical hypothesis test',
    'SSxy': 'Sum of Squares of X and Y variables.',
    'SSx': 'Sum of Squares of X variable.',
    'SSy': 'Sum of Squares of Y variable'
};

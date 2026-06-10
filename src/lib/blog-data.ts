// ============================================================
// Blog Database — Rich Structured Content for AdSense & SEO
// ============================================================

export interface BlogBlock {
  type: 'paragraph' | 'heading2' | 'heading3' | 'list' | 'table';
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'gst-calculator-how-to-use-it',
    title: 'GST Calculator: How to Use It',
    description: 'A comprehensive guide on using our free online GST calculator to add or remove GST from your product price, with CGST, SGST, and IGST breakdowns.',
    date: 'June 10, 2026',
    readTime: '6 min read',
    category: 'Guides',
    author: 'Tax Expert Team',
    content: [
      {
        type: 'paragraph',
        text: 'The Goods and Services Tax (GST) is a unified, destination-based indirect tax system in India that replaced a complex web of older indirect taxes such as central excise duty, service tax, state value-added tax (VAT), purchase tax, entry tax, and luxury tax. Since its implementation, calculating the correct tax amount has become an everyday necessity for business owners, traders, manufacturers, chartered accountants, and even consumers. While manual calculations are still possible, they are highly time-consuming and prone to mathematical errors that could lead to financial losses or compliance issues. Using an online GST calculator is the absolute best way to ensure 100% accuracy and save precious time. In this comprehensive guide, we will explain exactly how to use our free online GST calculator to manage your everyday business taxes in seconds.'
      },
      {
        type: 'heading2',
        text: 'What is an Online GST Calculator?'
      },
      {
        type: 'paragraph',
        text: 'An online GST calculator is a specialized digital tool designed to compute the tax amount applicable on goods or services based on the input price and tax rate. It is programmed with the standard Indian GST tax rate slabs—namely 3% (for gold and silver), 5%, 12%, 18%, and 28%. The tool automatically calculates the tax component and provides a complete, clear breakdown of CGST (Central Goods and Services Tax) and SGST (State Goods and Services Tax) for intra-state transactions, or IGST (Integrated Goods and Services Tax) for inter-state transactions. Our calculator offers dual functionality: you can easily choose to add tax to a base amount or remove tax from an all-inclusive price, which is known as a reverse GST calculation.'
      },
      {
        type: 'heading2',
        text: 'How to Use the GST Calculator: Step-by-Step'
      },
      {
        type: 'paragraph',
        text: 'Our online GST calculator is designed with user experience in mind, making it clean, fast, and easy to navigate. To perform a calculation, simply follow these basic steps:'
      },
      {
        type: 'list',
        items: [
          'Step 1: Enter the Amount — Input the starting amount of your goods or services in the main amount field. This can be the net price (exclusive of tax) if you want to add GST, or the total gross price (inclusive of tax) if you want to perform a reverse calculation.',
          'Step 2: Choose Tax Mode — Select your calculation goal. Choose "Add GST" if you want to find out the total price after tax. Select "Remove GST" (Reverse GST calculation) if you know the final price and want to find the base value and tax portion.',
          'Step 3: Select the GST Rate Slab — Tap on the appropriate tax rate button. The calculator displays standard rates including 3%, 5%, 12%, 18%, and 28%. For custom items that do not fall into standard slabs, you can manually type a custom percentage.',
          'Step 4: Analyze the Results Instantly — The system calculates the values in real-time. It displays the Net Amount (excluding tax), the calculated GST tax amount, and the Final Gross Amount (including tax).',
          'Step 5: View CGST / SGST / IGST Breakdown — Scroll down to see the tax split. For sales within the same state (Intra-state), it splits the tax equally into CGST and SGST. For sales to another state (Inter-state), it displays the entire tax amount as IGST, which helps you create accurate tax invoices.'
        ]
      },
      {
        type: 'heading2',
        text: 'The Mathematical Formulas Behind the Calculator'
      },
      {
        type: 'paragraph',
        text: 'If you want to understand how the calculator works behind the scenes or wish to perform these calculations on paper, here are the mathematical formulas used by our system:'
      },
      {
        type: 'heading3',
        text: '1. Formula to Add GST to Base Price'
      },
      {
        type: 'paragraph',
        text: 'When you have a base price and want to add GST to it, the calculation is straightforward. You find the percentage of the base price and add it to the original amount.'
      },
      {
        type: 'list',
        items: [
          'Formula: GST Amount = (Base Price * GST Rate) / 100',
          'Formula: Total Price (Gross) = Base Price + GST Amount',
          'Example: Let us assume a software service has a base price of ₹10,000 and the GST rate is 18%. The tax amount is calculated as (10,000 * 18) / 100 = ₹1,800. Therefore, the final invoice amount (Gross Price) is 10,000 + 1,800 = ₹11,800. In this intra-state sale, CGST is ₹900 and SGST is ₹900.'
        ]
      },
      {
        type: 'heading3',
        text: '2. Formula to Remove GST (Reverse GST)'
      },
      {
        type: 'paragraph',
        text: 'When you are given an all-inclusive price and need to extract the original base price and the tax component, you must use the reverse formula. Simply subtracting the tax percentage from the final price is incorrect because the tax was calculated on the smaller base price, not the final price.'
      },
      {
        type: 'list',
        items: [
          'Formula: Base Price (Net) = Total Price / (1 + (GST Rate / 100))',
          'Formula: GST Amount = Total Price - Base Price',
          'Example: Let us assume a retail customer buys a pair of branded shoes for an all-inclusive price of ₹2,360, where the GST rate is 18%. The base price is calculated as 2,360 / (1 + (18 / 100)) = 2,360 / 1.18 = ₹2,000. The GST amount is 2,360 - 2,000 = ₹360. CGST is ₹180 and SGST is ₹180.'
        ]
      },
      {
        type: 'heading2',
        text: 'Why Use Our Online GST Calculator?'
      },
      {
        type: 'paragraph',
        text: 'Using our specialized online tool provides several advantages over physical calculators or general spreadsheets. First, it completely eliminates human error, ensuring your invoices and tax filings are perfectly accurate. Second, it saves substantial time, allowing you to switch between rates and modes instantly. Third, the tool features a built-in invoice generator that uses the calculated values to generate a professional, PDF tax invoice ready for download. This makes it a complete, one-stop utility for small businesses, freelancers, and accounting professionals in India.'
      },
      {
        type: 'heading2',
        text: 'Conclusion'
      },
      {
        type: 'paragraph',
        text: 'Filing taxes and billing customers requires absolute precision. Whether you are checking restaurant bills, billing clients, or calculating the exact tax for quarterly GST returns, our free GST calculator makes the task effortless. Bookmark this page for easy daily access and experience simplified financial calculations today!'
      }
    ]
  },
  {
    slug: 'gst-rates-india-2025-complete-list',
    title: 'GST Rates in India 2025 — Complete List',
    description: 'Find the latest and most updated list of GST rates and tax slabs in India for 2025. Learn which items fall under the 0%, 5%, 12%, 18%, and 28% categories.',
    date: 'June 08, 2026',
    readTime: '7 min read',
    category: 'Updates',
    author: 'Finance Compliance Desk',
    content: [
      {
        type: 'paragraph',
        text: 'The Goods and Services Tax (GST) system in India classifies goods and services under five primary tax slabs: 0% (exempt), 5%, 12%, 18%, and 28%. Additionally, there are special low rates for precious materials, such as 3% for gold and silver, and 0.25% for rough semi-precious stones. The GST Council, led by the Union Finance Minister and comprising state representatives, holds periodic meetings to adjust these rates, remove anomalies, and adapt to changing economic situations. As we navigate through 2025, keeping track of the latest rates is essential for maintaining compliance and pricing your products correctly. In this article, we present a complete and updated list of GST rates in India for 2025.'
      },
      {
        type: 'heading2',
        text: 'Overview of India\'s GST Tax Slabs'
      },
      {
        type: 'paragraph',
        text: 'The primary classification of products and services is done using Harmonized System of Nomenclature (HSN) and Service Accounting Code (SAC) numbers. Let\'s explore the key items and services categorized under each slab in 2025.'
      },
      {
        type: 'heading3',
        text: '1. The 0% Tax Slab (Exempted Items)'
      },
      {
        type: 'paragraph',
        text: 'The zero-percent slab includes essential daily goods and basic services to protect common citizens and keep basic nutrition affordable. Items that do not attract any GST include:'
      },
      {
        type: 'list',
        items: [
          'Fresh fruits and green vegetables directly from farms.',
          'Unpacked daily food items like fresh milk, curd, lassi, buttermilk, and loose paneer.',
          'Unbranded and unpackaged grains, rice, wheat, pulses, and flour (atta).',
          'Fresh meat, fish, chicken, and organic eggs.',
          'Common salt, natural honey (unbranded), and sanitary napkins.',
          'Services like public education, basic healthcare, and passenger travel via general railway coaches or local transport.'
        ]
      },
      {
        type: 'heading3',
        text: '2. The 5% Tax Slab (Basic Household Consumption)'
      },
      {
        type: 'paragraph',
        text: 'This slab covers mass consumption items that are essential but packaged or processed. Key items include:'
      },
      {
        type: 'list',
        items: [
          'Pre-packaged and labeled food grains, rice, and flour.',
          'Packaged dairy products like branded paneer, curd, and milk.',
          'Edible vegetable oils, sugar, tea, coffee, and spices.',
          'Life-saving medicines, medical oxygen, and vaccine distributions.',
          'Apparel and garments priced below ₹1,000 per piece.',
          'Footwear priced below ₹1,000 per pair.',
          'Transport services like railways (AC coaches), metro, and cab aggregates (Uber/Ola).'
        ]
      },
      {
        type: 'heading3',
        text: '3. The 12% Tax Slab (Standard Commodities)'
      },
      {
        type: 'paragraph',
        text: 'This is a standard tax slab that applies to moderately processed goods and consumer items. It includes:'
      },
      {
        type: 'list',
        items: [
          'Processed food items like butter, ghee, cheese, and milk powders.',
          'Fruit juices, dry fruits, and roasted almonds.',
          'Mobile phones, charging devices, and basic electronics.',
          'Business class flight tickets and domestic tour services.',
          'Diagnostic kits, medical equipment, and non-life-saving devices.'
        ]
      },
      {
        type: 'heading3',
        text: '4. The 18% Tax Slab (Standard Services & Industrial Goods)'
      },
      {
        type: 'paragraph',
        text: 'The 18% rate is the most common slab in the Indian GST regime, covering nearly 60% of all goods and services, particularly in the professional and industrial sectors. Key items include:'
      },
      {
        type: 'list',
        items: [
          'Software development, software licenses, IT services, and telecom services.',
          'Branded apparel and footwear priced above ₹1,000.',
          'Dining at restaurants (both AC and non-AC, as well as food ordered online).',
          'Financial and banking services, including credit card charges and insurance premiums.',
          'Raw materials like iron, steel, copper, aluminum, and electrical wires.',
          'Monitors, printers, and intermediate industrial parts.'
        ]
      },
      {
        type: 'heading3',
        text: '5. The 28% Tax Slab (Luxury & Demerit Goods)'
      },
      {
        type: 'paragraph',
        text: 'The highest tax slab is reserved for luxury items, white goods, and sin/demerit products. Some items under this category also attract a Compensation Cess (ranging from 1% to over 200%). Items include:'
      },
      {
        type: 'list',
        items: [
          'Premium automobiles, luxury cars, SUVs, and high-end motorcycles.',
          'White goods like air conditioners, refrigerators, dishwashers, and washing machines.',
          'Aerated soft drinks, cola drinks, and energy drinks.',
          'Tobacco products, cigarettes, pan masala, and caffeinated beverages.',
          'Online real-money gaming, horse racing, and casino services.'
        ]
      },
      {
        type: 'heading2',
        text: 'Quick Reference: GST Rates Summary for 2025'
      },
      {
        type: 'table',
        headers: ['Tax Slab', 'Category Name', 'Key Examples'],
        rows: [
          ['0%', 'Exempted', 'Fresh vegetables, milk, eggs, unbranded flour, basic healthcare.'],
          ['3%', 'Special Low Rate', 'Gold, silver, precious jewelry, and semi-precious stones.'],
          ['5%', 'Basic Necessities', 'Packaged curd, tea, coffee, edible oil, railway transport, medicines.'],
          ['12%', 'Standard Goods', 'Butter, cheese, mobile phones, processed foods, diagnostic kits.'],
          ['18%', 'Standard Services', 'Software, banking services, restaurants, steel, branded clothes.'],
          ['28%', 'Luxury / Demerit', 'Air conditioners, luxury cars, cigarettes, online gaming, aerated drinks.']
        ]
      },
      {
        type: 'heading2',
        text: 'GST Slab Rationalization & Future Outlook'
      },
      {
        type: 'paragraph',
        text: 'As we move forward in 2025, the GST Council is actively working on slab rationalization. There are ongoing proposals to merge the 12% and 18% slabs into a single standard rate of 15% or 16% to simplify compliance and minimize legal disputes regarding classification. There are also efforts to reduce tax on health and life insurance premiums, which has been a strong demand from consumers. It is highly recommended to consult the official GST portal (gst.gov.in) or use our dynamic GST calculator to check the latest rates before preparing invoices or filing your tax returns.'
      }
    ]
  },
  {
    slug: 'how-to-file-gst-return-step-by-step',
    title: 'How to File GST Return Step by Step',
    description: 'A simple, step-by-step guide on how to file your GST returns online on the government portal. Learn about GSTR-1, GSTR-3B, deadlines, and penalties.',
    date: 'June 05, 2026',
    readTime: '6 min read',
    category: 'Compliance',
    author: 'Chartered Accountant Desk',
    content: [
      {
        type: 'paragraph',
        text: 'Filing Goods and Services Tax (GST) returns is a mandatory requirement for all registered businesses and individuals in India. A GST return is a document that contains details of sales (outward supplies), purchases (inward supplies), and tax liability. Preparing and filing these returns online may seem overwhelming, but the process is highly structured. Under the current system, taxpayers must use the official government portal to report transactions and pay taxes. In this comprehensive guide, we provide a simplified, step-by-step explanation of how to file your GST returns online.'
      },
      {
        type: 'heading2',
        text: 'Prerequisites for Filing GST Returns'
      },
      {
        type: 'paragraph',
        text: 'Before you start the filing process, ensure you have the following ready to avoid any interruptions:'
      },
      {
        type: 'list',
        items: [
          'A valid 15-digit GSTIN (GST Identification Number).',
          'Login credentials (Username and Password) for the official GST Portal (gst.gov.in).',
          'Clean, organized records of all sales and purchase invoices for the tax period.',
          'An active internet connection and a Digital Signature Certificate (DSC) for corporations, or a mobile number linked with Aadhaar for OTP verification (EVC) for sole proprietors.'
        ]
      },
      {
        type: 'heading2',
        text: 'Understanding Major Return Forms: GSTR-1 vs GSTR-3B'
      },
      {
        type: 'paragraph',
        text: 'A regular taxpayer in India is required to file two primary monthly/quarterly returns. Understanding the purpose of each is crucial:'
      },
      {
        type: 'list',
        items: [
          'GSTR-1 (Sales Return): This return details all your outward supplies (sales). You must upload all your sales invoices here, specifying client GSTINs, rates, and values. Filing this determines your tax liability for the month. It is usually filed by the 11th of the following month.',
          'GSTR-3B (Summary Return): This is a self-declared summary return where you report total sales, claim Input Tax Credit (ITC) on purchases, and pay the remaining tax liability. It is usually filed by the 20th of the following month.'
        ]
      },
      {
        type: 'heading2',
        text: 'Step-by-Step GST Filing Process on the Portal'
      },
      {
        type: 'heading3',
        text: 'Step 1: Log in to the GST Portal'
      },
      {
        type: 'paragraph',
        text: 'Navigate to www.gst.gov.in using your browser. Click on the "Login" button at the top right, enter your credentials (username, password), solve the captcha image, and click Submit to access your dashboard.'
      },
      {
        type: 'heading3',
        text: 'Step 2: Access the Returns Dashboard'
      },
      {
        type: 'paragraph',
        text: 'Once logged in, navigate to the Services menu, click on "Returns", and select "Returns Dashboard". Choose the Financial Year and the filing period (month or quarter) from the dropdown list, then click "Search".'
      },
      {
        type: 'heading3',
        text: 'Step 3: Prepare and File GSTR-1'
      },
      {
        type: 'paragraph',
        text: 'Locate the GSTR-1 tile and click "Prepare Online". You will see several tiles representing different invoice categories, such as B2B (Business-to-Business), B2C (Business-to-Consumer), and credit/debit notes. Click on each relevant tile to upload your sales invoice details, then click "Save". Once all invoices are added, scroll down, click "Generate Summary", preview the PDF draft, and click "File Return". You can authorize the filing using Aadhaar OTP (EVC) or DSC.'
      },
      {
        type: 'heading3',
        text: 'Step 4: Verify Input Tax Credit (ITC) & Open GSTR-3B'
      },
      {
        type: 'paragraph',
        text: 'Return to the dashboard and locate the GSTR-3B tile. The GST portal automatically pulls sales data from GSTR-1 and purchase/ITC data from GSTR-2B. GSTR-2B is an auto-drafted ITC statement generated based on invoice uploads by your suppliers. Check these pre-filled values against your internal purchase ledger to ensure you only claim valid tax credits.'
      },
      {
        type: 'heading3',
        text: 'Step 5: Pay Tax and Offset Liability'
      },
      {
        type: 'paragraph',
        text: 'Proceed to the Payment Section. The portal calculates the net tax payable after offsetting your sales liability with your available Input Tax Credit. If your credit is insufficient, you must pay the balance in cash. Click "Create Challan" to generate an online payment slip, pay the tax using Net Banking, UPI, or NEFT, and then click "Offset Liability" to complete the payment adjustment.'
      },
      {
        type: 'heading3',
        text: 'Step 6: File GSTR-3B'
      },
      {
        type: 'paragraph',
        text: 'Preview your GSTR-3B summary. Check the declaration box, select the authorized signatory, and click "File GSTR-3B with EVC" or DSC. Enter the OTP sent to your registered mobile and email. Once verified, a success message and an Application Reference Number (ARN) will be generated.'
      },
      {
        type: 'heading2',
        text: 'Late Fee and Penalty for Late Filing'
      },
      {
        type: 'paragraph',
        text: 'Filing after the deadline leads to automated penalties on the portal. For Nil returns, the late fee is ₹20 per day (₹10 CGST + ₹10 SGST). For taxable returns, it is ₹50 per day (₹25 CGST + ₹25 SGST) up to a statutory cap. Additionally, a 18% annual interest rate applies to any tax liability paid late in cash. Filing on time is crucial to maintain a high GST compliance rating.'
      },
      {
        type: 'heading2',
        text: 'Conclusion'
      },
      {
        type: 'paragraph',
        text: 'Filing GST returns regularly keeps your business compliant and ensures you do not lose out on valuable Input Tax Credit. Always use our online GST calculator to verify your invoice tax values before uploading them. For complicated transactions, consulting a qualified Chartered Accountant is highly recommended to protect your business.'
      }
    ]
  },
  {
    slug: 'difference-between-cgst-sgst-igst',
    title: 'Difference Between CGST, SGST and IGST',
    description: 'Learn the core differences between Central GST, State GST, and Integrated GST. Discover how tax is split and collected based on intra-state and inter-state transactions.',
    date: 'June 03, 2026',
    readTime: '6 min read',
    category: 'Education',
    author: 'Compliance Advisor',
    content: [
      {
        type: 'paragraph',
        text: 'One of the most common points of confusion for small business owners and consumers in India is understanding why GST is split into three different abbreviations: CGST, SGST, and IGST. India operates under a dual GST structure, which means both the Central Government and State Governments levy tax simultaneously on a single transaction. To manage this dual collection system and distribute tax revenues fairly between the Center and the States, the tax is categorized into CGST, SGST, and IGST based on the location of the seller and the buyer. In this post, we will explain the differences clearly with practical examples.'
      },
      {
        type: 'heading2',
        text: 'Definitions: What Do CGST, SGST, and IGST Stand For?'
      },
      {
        type: 'heading3',
        text: '1. CGST (Central Goods and Services Tax)'
      },
      {
        type: 'paragraph',
        text: 'CGST is the tax collected by the Central Government on transactions that take place within a single state (Intra-state sales). For example, if a business in Mumbai sells goods to another business in Pune, this is a transaction within Maharashtra. The Central Government collects the CGST component, which goes directly to the Central treasury.'
      },
      {
        type: 'heading3',
        text: '2. SGST (State Goods and Services Tax)'
      },
      {
        type: 'paragraph',
        text: 'SGST is the tax collected by the State Government where the transaction takes place on Intra-state sales. In Union Territories like Delhi or Puducherry, this is called UTGST (Union Territory Goods and Services Tax). The revenue goes directly to the respective State or Union Territory.'
      },
      {
        type: 'heading3',
        text: '3. IGST (Integrated Goods and Services Tax)'
      },
      {
        type: 'paragraph',
        text: 'IGST is the tax levied on transactions that occur between two different states (Inter-state sales), as well as on imports and exports. The Central Government collects this tax and then distributes the state share to the consuming state (as GST is a destination-based consumption tax).'
      },
      {
        type: 'heading2',
        text: 'When Are They Applied? (Intra-State vs Inter-State)'
      },
      {
        type: 'paragraph',
        text: 'The application depends purely on the Location of Supplier and the Place of Supply (destination of the goods or services).'
      },
      {
        type: 'heading3',
        text: 'Scenario A: Intra-State Transaction (Within the Same State)'
      },
      {
        type: 'paragraph',
        text: 'If a manufacturer in Mumbai, Maharashtra sells goods to a wholesaler in Pune, Maharashtra, both are in the same state. Therefore, it is an Intra-state supply. Both CGST and SGST will apply, split equally.'
      },
      {
        type: 'list',
        items: [
          'Product Price: ₹10,000',
          'GST Slab: 18%',
          'Total GST = ₹1,800',
          'CGST (9%) = ₹900 (goes to Central Government)',
          'SGST (9%) = ₹900 (goes to Maharashtra State Government)'
        ]
      },
      {
        type: 'heading3',
        text: 'Scenario B: Inter-State Transaction (Between Different States)'
      },
      {
        type: 'paragraph',
        text: 'If a manufacturer in Mumbai, Maharashtra sells goods to a retailer in Bengaluru, Karnataka, it is an Inter-state transaction. In this case, only IGST will apply at the full rate.'
      },
      {
        type: 'list',
        items: [
          'Product Price: ₹10,000',
          'GST Slab: 18%',
          'Total GST (IGST at 18%) = ₹1,800 (goes to the Central Government first, then divided between Center and Karnataka state).'
        ]
      },
      {
        type: 'heading2',
        text: 'Key Differences at a Glance'
      },
      {
        type: 'table',
        headers: ['Feature', 'CGST', 'SGST / UTGST', 'IGST'],
        rows: [
          ['Full Form', 'Central Goods & Services Tax', 'State Goods & Services Tax', 'Integrated Goods & Services Tax'],
          ['Levied By', 'Central Government', 'State Government / UT', 'Central Government'],
          ['Applied On', 'Intra-state sales (within state)', 'Intra-state sales (within state)', 'Inter-state sales (between states)'],
          ['Revenue Share', 'Goes 100% to Central Treasury', 'Goes 100% to State Treasury', 'Shared between Center and Buyer State'],
          ['Tax Split', 'Equal split with SGST (e.g., 9% + 9%)', 'Equal split with CGST (e.g., 9% + 9%)', 'Levied fully as one rate (e.g., 18%)']
        ]
      },
      {
        type: 'heading2',
        text: 'Why does India need this split?'
      },
      {
        type: 'paragraph',
        text: 'India is a federal country where both the Union and State governments have separate financial responsibilities. Before GST, states levied sales tax/VAT and the center levied excise. To ensure both governments maintain their fiscal autonomy, the GST Council created this dual framework. Using our free online GST calculator makes it easy because it handles this split for you. Select your state transaction mode, and the tool will show you exactly how to split your CGST and SGST or apply IGST on your invoice.'
      }
    ]
  },
  {
    slug: 'gst-on-food-items-india',
    title: 'GST on Food Items in India',
    description: 'An updated guide to GST rates on food items in India. Find out the tax rates for restaurant dining, food delivery apps, and fresh vs packaged groceries.',
    date: 'June 01, 2026',
    readTime: '6 min read',
    category: 'Tax Rates',
    author: 'Consumer Awareness Group',
    content: [
      {
        type: 'paragraph',
        text: 'Food is a fundamental necessity, and its taxation is one of the most sensitive areas of public policy in India. When the Goods and Services Tax (GST) was launched, the goal was to keep basic food items tax-free or lightly taxed, while applying higher rates to luxury or processed food items. However, recent clarifications and amendments by the GST Council have changed how certain packaged foods and eating-out services are taxed. In this post, we provide an easy-to-understand breakdown of GST on food items in India.'
      },
      {
        type: 'heading2',
        text: 'GST on Groceries: Fresh vs Packaged Foods'
      },
      {
        type: 'paragraph',
        text: 'The taxation of groceries depends largely on whether the items are pre-packaged and labeled, or sold loose.'
      },
      {
        type: 'heading3',
        text: '1. Unpackaged and Loose Food Items (0% GST)'
      },
      {
        type: 'paragraph',
        text: 'Basic raw food items sold loose without pre-packaging are completely exempt from GST. This is done to support local farmers and low-income households. Examples include:'
      },
      {
        type: 'list',
        items: [
          'Fresh fruits and green vegetables.',
          'Loose grains like wheat, rice, pulses, and flour (atta).',
          'Fresh raw milk, curd, and paneer sold by local dairies in non-packaged form.',
          'Raw eggs, fresh meat, and fresh fish.'
        ]
      },
      {
        type: 'heading3',
        text: '2. Pre-packaged and Labeled Food Items (5% GST)'
      },
      {
        type: 'paragraph',
        text: 'If the same basic food items are pre-packaged and labeled under legal metrology guidelines, they attract a 5% GST rate. This includes:'
      },
      {
        type: 'list',
        items: [
          'Pre-packaged branded rice, wheat flour (atta), pulses, and semolina (suji).',
          'Packaged dairy items like branded curd, lassi, buttermilk, and paneer.',
          'Packaged organic food products, honey, and jaggery.'
        ]
      },
      {
        type: 'heading2',
        text: 'GST Slabs for Restaurant Dining & Food Delivery'
      },
      {
        type: 'paragraph',
        text: 'When you eat out or order food online, the GST rates vary depending on the type of establishment and whether they have liquor licenses.'
      },
      {
        type: 'heading3',
        text: '1. Standalone Restaurants (5% GST)'
      },
      {
        type: 'paragraph',
        text: 'Most local restaurants, cafes, dhabas, and sweet shops charge 5% GST on the food bill. However, these restaurants cannot claim Input Tax Credit (ITC) on the ingredients they purchase. This rate applies to both AC and non-AC standalone eateries.'
      },
      {
        type: 'heading3',
        text: '2. Restaurant inside Luxury Hotels (18% GST)'
      },
      {
        type: 'paragraph',
        text: 'Dining at a restaurant located inside a hotel where the room tariff exceeds ₹7,500 per night attracts an 18% GST rate. These establishments are eligible to claim Input Tax Credit.'
      },
      {
        type: 'heading3',
        text: '3. Food Delivery Apps (5% GST)'
      },
      {
        type: 'paragraph',
        text: 'When you order food online via platforms like Zomato or Swiggy, a 5% GST is applicable. The delivery apps collect this tax from consumers and pay it directly to the government on behalf of the restaurants.'
      },
      {
        type: 'heading2',
        text: 'GST Slabs on Packaged Snacks, Chocolates, and Sweets'
      },
      {
        type: 'paragraph',
        text: 'Processed foods, snacks, and sweets fall into higher tax categories because they are not classified as raw essentials.'
      },
      {
        type: 'list',
        items: [
          'Sweets (Mithai) & Namkeens: Sweet shop items and branded snacks like chips, namkeens, and bhujia attract a 5% GST rate.',
          'Chocolates & Wafers: Chocolates, cocoa-based products, and premium baked goods attract an 18% GST rate.',
          'Aerated Soft Drinks: Carbonated drinks, cold drinks, and energy drinks attract the highest slab of 28% GST, plus an additional 12% Compensation Cess, making the total tax 40%.'
        ]
      },
      {
        type: 'heading2',
        text: 'Conclusion'
      },
      {
        type: 'paragraph',
        text: 'The GST Council maintains a balanced approach by keeping essential farm products tax-free while taxing processed items and eating out. Understanding these slabs helps you double-check your restaurant and grocery bills for accuracy. Next time you receive a bill, use our online GST calculator to ensure you are being billed under the correct tax slabs!'
      }
    ]
  }
];

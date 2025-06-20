import React from 'react';

const packages = [
  {
    id: 1,
    title: 'Family Package',
    dives: 'Multiple',
    withoutEquipment: 'ToBeUpdated',
    equipmentHire: 'ToBeUpdated',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a836b583-d5fc-4458-bc0b-750986974069.png',
    altText: 'Family enjoying safe and fun scuba diving experience',
    price: 'ToBeUpdated',
    duration: 'Flexible',
    details: 'Ideal for families, enjoy safe and fun diving outings suitable for all ages.',
  },
  {
    id: 2,
    title: 'Time Base Package',
    dives: 'Variable',
    withoutEquipment: 'ToBeUpdated',
    equipmentHire: 'ToBeUpdated',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/08381de5-ff27-4814-afc7-b2a4afeb8dbc.png',
    altText: 'Diverse dive sites explored within flexible time periods',
    price: 'ToBeUpdated',
    duration: 'Flexible',
    details: 'Pay for your diving time and customize your schedule to fit your diving goals.',
  },
  {
    id: 3,
    title: 'Full Day Package',
    dives: 'Multiple dives',
    withoutEquipment: 'ToBeUpdated',
    equipmentHire: 'ToBeUpdated',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c8135cc9-b1ca-4559-8846-4c49e7c924bd.png',
    altText: 'Diving all day through stunning coral reefs and shipwrecks',
    price: 'ToBeUpdated',
    duration: 'Full day',
    details: 'Spend a full day experiencing multiple dive sites and diverse underwater landscapes.',
  },
  {
    id: 4,
    title: 'Daily Dive Trip',
    dives: '2 dives/trip',
    withoutEquipment: 'ToBeUpdated',
    equipmentHire: 'ToBeUpdated',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fda183f2-ad18-42ab-af33-5b24f69354c9.png',
    altText: 'Coral reef underwater dive scene with vibrant coral and fish',
    price: 'ToBeUpdated',
    duration: '1 day',
    details: 'Enjoy two exciting dives in local reefs, perfect for beginners and experienced divers alike.',
  },
  {
    id: 5,
    title: '3 Day Package',
    dives: '6 dives',
    withoutEquipment: 'ToBeUpdated',
    equipmentHire: 'ToBeUpdated',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c9e81a6e-bf7d-4310-a6b8-d3aae469ae42.png',
    altText: 'Diver photographing colorful marine life underwater',
    price: 'ToBeUpdated',
    duration: '3 days',
    details: 'Six dives over three days for an immersive dive experience with diverse marine environments.',
  },
  {
    id: 6,
    title: '4 Day Package',
    dives: '8 dives',
    withoutEquipment: 'ToBeUpdated',
    equipmentHire: 'ToBeUpdated',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3ceadcd4-71f1-4dfb-b6a5-49496757bf7e.png',
    altText: 'Close-up of clownfish nestled in sea anemone',
    price: 'ToBeUpdated',
    duration: '4 days',
    details: 'Explore vibrant reefs and discover unique marine species with a total of eight dives.',
  },
  {
    id: 7,
    title: '5 Day Package',
    dives: '10 dives',
    withoutEquipment: 'ToBeUpdated',
    equipmentHire: 'ToBeUpdated',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b6374231-7397-4931-bbf9-441e9040d8d1.png',
    altText: 'Diver underwater during stunning sunset dive session',
    price: 'ToBeUpdated',
    duration: '5 days',
    details: 'Extended experience with ten dives designed for avid divers wishing to explore deeper sites.',
  },
  {
    id: 8,
    title: '6 Day Package',
    dives: '12 dives',
    withoutEquipment: 'ToBeUpdated',
    equipmentHire: 'ToBeUpdated',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a3e5a564-1bed-40cc-bc21-1740098b8c55.png',
    altText: 'Diver exploring deep blue ocean with marine life',
    price: 'ToBeUpdated',
    duration: '6 days',
    details: 'Comprehensive package offering 12 dives, perfect for mastering advanced diving skills.',
  },
];

const DivePackagesPage = () => {
  return (
    <>
      <style jsx>{`
        .package-card:hover,
        .package-card:focus {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 61, 129, 0.18);
        }
        
        @media (max-width: 768px) {
          .package-card:hover,
          .package-card:focus {
            transform: none;
          }
        }
      `}</style>
      
      <main aria-label="Dive packages information page" style={styles.main}>
        <header style={styles.headerSection}>
          <h1 style={styles.pageTitle}>DiveMe Packages Overview</h1>
          <p style={styles.pageSubtitle}>
            Explore our exciting range of dive packages. Pricing and equipment hire details will be updated soon.
          </p>
        </header>

        <section style={styles.packagesGrid} aria-live="polite" aria-relevant="additions">
          {packages.map(pkg => (
            <article
              key={pkg.id}
              tabIndex="0"
              aria-labelledby={`pkg-title-${pkg.id}`}
              style={styles.packageCard}
              className="package-card"
            >
              <img
                src={pkg.imageUrl}
                alt={pkg.altText}
                style={styles.packageImage}
                loading="lazy"
                width={400}
                height={300}
                onError={(e) => e.currentTarget.src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9bc30a03-0b80-4b6f-bf58-e4e414cd0694.png"}
              />
              <div style={styles.packageInfo}>
                <h2 id={`pkg-title-${pkg.id}`} style={styles.packageTitle}>{pkg.title}</h2>
                <dl style={styles.detailsList}>
                  <dt style={styles.dt}>Dives:</dt>
                  <dd style={styles.dd}>{pkg.dives}</dd>
                  <dt style={styles.dt}>Price:</dt>
                  <dd style={styles.dd}>{pkg.price}</dd>
                  <dt style={styles.dt}>Duration:</dt>
                  <dd style={styles.dd}>{pkg.duration}</dd>
                  <dt style={styles.dt}>More Details:</dt>
                  <dd style={styles.dd}>{pkg.details}</dd>
                </dl>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};
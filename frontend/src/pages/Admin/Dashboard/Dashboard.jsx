import "./Dashboard.css";
import React, { useRef, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RateReviewIcon from "@mui/icons-material/RateReview";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const detailsRef = useRef();
  const [isOpen, setIsOpen] = useState(true);

  const handleDetailsHeightAnimate = (e) => {
    console.log("clicked");
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="dashboard_container">
      <div className="dashboard_side_nav">
        <Link to="/dashboard">
          <div className="dashbord_icon">
            <DashboardIcon />
            <p>Dashboard</p>
          </div>
        </Link>
        <details
          className="products_container"
          ref={detailsRef}
          open={isOpen}
          onClick={handleDetailsHeightAnimate}
        >
          <summary>Products</summary>
          <Link to="/admin/addProduct" className="link_products_actions">
            <div className="dashbord_icon">
              <AddIcon />
              <p>Create</p>
            </div>
          </Link>
          <Link to="/admin/allProducts">
            <div className="dashbord_icon">
              <PostAddIcon />
              <p>All</p>
            </div>
          </Link>
        </details>

        <Link to="/dashboard">
          <div className="dashbord_icon">
            <ListAltIcon />
            <p>Orders</p>
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="dashbord_icon">
            <GroupIcon />
            <p>Users</p>
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="dashbord_icon">
            <RateReviewIcon />
            <p>Reviews</p>
          </div>
        </Link>
      </div>

      <div className="dashboard_main_content">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolores porro sint doloribus, a tenetur quos! Laboriosam iste corrupti dolorem iusto corporis facilis sequi magnam perferendis suscipit necessitatibus tempore beatae cupiditate voluptate eius eveniet alias dolore a dicta eum, tenetur blanditiis quas labore aperiam? Architecto quaerat qui, consectetur praesentium dolorum commodi facere cumque animi inventore suscipit omnis doloremque in! Pariatur facilis expedita delectus rem praesentium itaque mollitia doloremque, molestiae qui minus assumenda vel modi! Harum, explicabo modi accusantium corporis tempora eveniet dolorem esse recusandae velit neque mollitia voluptatibus voluptates provident quam commodi praesentium, fugiat distinctio laudantium numquam in quos amet iure aspernatur ut. Id rerum obcaecati quisquam assumenda aliquid sint ut culpa ducimus delectus, nam impedit excepturi eveniet! Facere odit minus similique veritatis ducimus doloremque officiis quaerat? Sequi hic maxime eaque quod, blanditiis magnam sunt nisi quam temporibus, corrupti, perferendis eius vel voluptates voluptate officiis. Error ratione adipisci tenetur recusandae cupiditate! Impedit quidem aliquid aperiam expedita sed autem, mollitia et, ab, aliquam nihil repellat molestiae. Corrupti nihil, libero ducimus quis deleniti sapiente delectus aperiam iusto dignissimos maxime quod ratione velit porro quisquam natus nesciunt illum quas ipsum aliquam. Quibusdam veniam eius dolore ipsa fugit quae voluptate hic, esse temporibus mollitia et possimus laborum quasi! Exercitationem laudantium ipsum tempora tempore quaerat magni nobis, nesciunt id doloribus accusantium labore? Nesciunt distinctio sed porro eius doloremque omnis nostrum repellat obcaecati repudiandae nisi, consequatur optio in provident blanditiis ut pariatur eos quos aspernatur cupiditate corporis molestias voluptatum. Consectetur adipisci necessitatibus fugit animi laboriosam nisi distinctio sint, dolores ipsum. Distinctio expedita necessitatibus aspernatur dolorum praesentium nemo quasi commodi cum aut. Commodi laudantium amet, atque obcaecati odit ratione explicabo nisi quibusdam esse nulla iste autem officia molestias, sapiente eaque mollitia! Dignissimos aspernatur culpa placeat, corrupti quibusdam maiores aut nobis mollitia ipsum aliquam eveniet ea deleniti, non iusto reiciendis, beatae facere quia. Eveniet, obcaecati deserunt, nostrum voluptates magni incidunt possimus nisi deleniti unde saepe odio voluptatem excepturi autem dolore dolores? Eius, rem. Dignissimos, consectetur corporis sequi amet deleniti ipsum explicabo beatae debitis temporibus numquam odit placeat laudantium suscipit est esse architecto earum ab culpa deserunt mollitia! In molestiae dignissimos atque, quia illo eaque corporis temporibus modi autem itaque accusantium ea voluptate hic quod assumenda, quisquam, voluptas tenetur quibusdam cum consectetur dicta obcaecati id? Quisquam cumque beatae ad recusandae culpa nisi, sequi suscipit vero placeat iste sint quam reprehenderit ratione minima consequatur eum impedit dignissimos neque! Expedita quae harum praesentium ipsum minus quisquam ipsa repudiandae commodi aspernatur. Recusandae itaque assumenda ab explicabo optio alias et qui quas non laudantium numquam cumque, veniam mollitia consectetur iusto nihil ipsa? Saepe atque impedit dicta dolores voluptates sed dolorum incidunt ipsum modi, eveniet illum illo fuga. Maiores, error deserunt qui quidem dolorum recusandae eius numquam voluptatem ea nobis? Ad inventore expedita eum saepe quisquam assumenda in suscipit illum veniam minus officia debitis maiores doloremque sit molestiae voluptates nemo iure, dolorum esse eveniet temporibus placeat exercitationem aliquid. Rem doloribus fugit perspiciatis, hic, accusamus cum voluptatum harum voluptatibus quod deserunt dolorum voluptas. At minus totam earum error cum unde nemo perferendis esse harum necessitatibus, ipsa quibusdam odit cumque nihil corporis culpa rerum dicta delectus, dignissimos omnis. Hic tempore itaque consectetur omnis eius iure. Corporis consectetur consequuntur harum temporibus repudiandae amet odio, cupiditate doloribus recusandae hic, suscipit non tempora. Inventore nesciunt nam ad temporibus, provident corrupti exercitationem eum itaque unde voluptatibus doloribus iste vitae ratione corporis! Reiciendis placeat, earum assumenda perspiciatis id ducimus, blanditiis ab quis modi beatae nobis vero praesentium perferendis saepe quos obcaecati repudiandae, harum rem ratione provident ex molestias. Rerum provident ducimus aliquid assumenda maiores amet inventore modi molestiae impedit nisi recusandae autem illum, magnam, pariatur qui beatae nemo excepturi quam quod veniam sequi dignissimos ut! Aspernatur ex modi ea ullam eaque. Voluptatibus incidunt quo tempora, eum nihil debitis facere maiores maxime. Ratione enim quaerat minima at iste dolorum aspernatur qui eveniet? Corrupti voluptate natus a est nostrum consequatur illum nihil totam porro consectetur aliquid temporibus fuga debitis quam perspiciatis harum placeat blanditiis accusantium accusamus numquam dolorem, vel fugit. Molestias nulla maxime corporis optio repellendus voluptatibus nemo tenetur asperiores cum nisi iusto facere voluptate nam eos officiis ipsum labore, natus numquam dolor sequi doloremque ipsa reprehenderit fuga recusandae? Excepturi dolore dolor maxime. Cumque voluptates, neque fugiat corrupti veniam facilis tempore libero velit error perspiciatis facere inventore, porro modi recusandae quae sed qui corporis debitis rerum molestias vitae. Veniam et doloremque quasi neque ab? Commodi nihil obcaecati exercitationem, a ullam autem molestiae ipsa vero minus laborum voluptate itaque totam, iste velit vel veritatis accusantium harum explicabo ea ducimus nostrum odio soluta, cum esse! Animi ea iure facere pariatur ullam alias fugit inventore cumque assumenda minus consectetur quasi, adipisci, laboriosam eaque repellendus culpa, id itaque. Recusandae placeat ea accusantium laborum qui magni provident blanditiis dolore modi, sequi dolorum obcaecati natus dolores nesciunt culpa, velit id magnam eveniet numquam eum eos eius. Eum id doloremque recusandae neque quod est quibusdam iusto nemo sequi eligendi tenetur quasi asperiores iure ipsa, dolorem autem laboriosam unde commodi quos sit veritatis, ex at soluta. Sint, ipsa ullam similique nesciunt vel expedita dignissimos nisi? Eaque dignissimos provident beatae quod unde dolorum voluptatibus odit aut nam expedita magni aliquam soluta ab, ullam laudantium a! Ipsum molestias sunt dolor tenetur voluptatibus est nesciunt repellendus incidunt eaque fugit voluptate veniam vitae dicta repellat perferendis, omnis aperiam numquam iusto minima dolorum ex atque ut eos? Dolorum est repudiandae repellat vel exercitationem, nobis, fuga officia voluptate temporibus suscipit quis sed, natus illum eveniet hic saepe nisi quasi nostrum velit facere. Consequatur nisi voluptate iusto soluta, dolores sit quis quas expedita sapiente autem omnis porro enim pariatur fugiat cumque doloribus illo aliquam, reprehenderit consectetur voluptates culpa eius repudiandae? Praesentium nemo voluptatem voluptas placeat asperiores cum delectus! Similique repellendus esse, neque voluptates iure ipsam cumque atque consequuntur vero ratione non suscipit tenetur ut eius porro deserunt vel iusto necessitatibus repellat mollitia! Ab obcaecati consequuntur maxime voluptatibus hic? Eligendi impedit quisquam incidunt omnis itaque accusamus nostrum, harum consequuntur velit, explicabo commodi at! Aliquid laudantium repellendus corrupti necessitatibus dolorum.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

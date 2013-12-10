function onGameInit() 
{   
    document.title = "원더랜드: 엘-로드";
    
    GAME_FPS = 30;
    debugSystem.debugMode = false;
    //리소스 프리로딩
    //로딩 화면 이미지
    resourcePreLoader.AddImage("img/loading.png");
    resourcePreLoader.AddImage("img/loading_loginbutton_01.png");
    resourcePreLoader.AddImage("img/loading_loginbutton_01_down.png");
    resourcePreLoader.AddImage("img/loading_loginbutton_02.png");
    resourcePreLoader.AddImage("img/loading_loginbutton_02_down.png");

    resourcePreLoader.AddImage("img/error.png");
    //맵 화면 이미지
    resourcePreLoader.AddImage("img/settingbutton.png");
    resourcePreLoader.AddImage("img/settingbutton_down.png");
    resourcePreLoader.AddImage("img/map.png");
    resourcePreLoader.AddImage("img/map_madhatterbutton.png");
    resourcePreLoader.AddImage("img/map_madhatterbutton_down.png");
    //선택 화면(매드헤터 유니온) 이미지
    resourcePreLoader.AddImage("img/backbutton.png");
    resourcePreLoader.AddImage("img/backbutton_down.png"); 
    resourcePreLoader.AddImage("img/select.png");
    resourcePreLoader.AddImage("img/select_databutton_on.png");
    resourcePreLoader.AddImage("img/select_databutton_off.png");
    resourcePreLoader.AddImage("img/select_gamebutton_on.png");
    resourcePreLoader.AddImage("img/select_gamebutton_off.png");
    resourcePreLoader.AddImage("img/select_gamescroll.png");
    resourcePreLoader.AddImage("img/select_gamescroll_mask.png");
    resourcePreLoader.AddImage("img/select_gamescroll_shop.png");
    resourcePreLoader.AddImage("img/select_gamescroll_shop_down.png");
    resourcePreLoader.AddImage("img/select_gamescroll_stage02.png");
    resourcePreLoader.AddImage("img/select_gamescroll_stage02_down.png");
    resourcePreLoader.AddImage("img/select_gamescroll_stage03.png");
    resourcePreLoader.AddImage("img/select_gamescroll_stage03_down.png");
    resourcePreLoader.AddImage("img/select_gamescroll_startbutton.png");
    resourcePreLoader.AddImage("img/select_gamescroll_startbutton_down.png");

    resourcePreLoader.AddImage("img/select_datascroll.png");
    resourcePreLoader.AddImage("img/select_datascroll_mask.png");
    resourcePreLoader.AddImage("img/select_datascroll_receivebutton_on.png");
    resourcePreLoader.AddImage("img/select_datascroll_receivebutton_on_down.png");
    resourcePreLoader.AddImage("img/select_datascroll_receivebutton_off.png");
    resourcePreLoader.AddImage("img/select_datascroll_receivebutton_off_down.png");
    resourcePreLoader.AddImage("img/select_datascroll_sendbutton_on.png");
    resourcePreLoader.AddImage("img/select_datascroll_sendbutton_on_down.png");
    resourcePreLoader.AddImage("img/select_datascroll_sendbutton_off.png");
    resourcePreLoader.AddImage("img/select_datascroll_sendbutton_off_down.png");
    //게임 화면 이미지
    resourcePreLoader.AddImage("img/game_loading.png");
    resourcePreLoader.AddImage("img/game_background_00.png");
    resourcePreLoader.AddImage("img/game_background_01.png");
    resourcePreLoader.AddImage("img/game_background_02.png");
    resourcePreLoader.AddImage("img/game_background_03.png");
    resourcePreLoader.AddImage("img/game_background_leftside.png");
    resourcePreLoader.AddImage("img/game_background_rightside.png");
    resourcePreLoader.AddImage("img/game_player_left.png");
    resourcePreLoader.AddImage("img/game_player_right.png");
    resourcePreLoader.AddImage("img/game_enemy_dia_left.png");
    resourcePreLoader.AddImage("img/game_enemy_dia_left_dead.png");
    resourcePreLoader.AddImage("img/game_enemy_dia_left_attack.png");
    resourcePreLoader.AddImage("img/game_enemy_dia_right.png");
    resourcePreLoader.AddImage("img/game_enemy_dia_right_dead.png");
    resourcePreLoader.AddImage("img/game_enemy_dia_right_attack.png");
    resourcePreLoader.AddImage("img/shadow.png");
    resourcePreLoader.AddImage("img/game_item_coin.png");
    resourcePreLoader.AddImage("img/game_ward.png");
    resourcePreLoader.AddImage("img/skillspelling_left.png");
    resourcePreLoader.AddImage("img/skillspelling_right.png");
    resourcePreLoader.AddImage("img/game_fireball_left.png");
    resourcePreLoader.AddImage("img/game_fireball_right.png");
    resourcePreLoader.AddImage("img/game_enemy_knockback.png");
    resourcePreLoader.AddImage("img/game_flame_left.png");
    resourcePreLoader.AddImage("img/game_flame_right.png");
    
    resourcePreLoader.AddImage("img/message_coin.png");
    resourcePreLoader.AddImage("img/message_exp.png");
    resourcePreLoader.AddImage("img/message_level_up.png");
    resourcePreLoader.AddImage("img/message_score.png");

    resourcePreLoader.AddImage("img/game_notify_enemydia_left.png");
    resourcePreLoader.AddImage("img/game_notify_enemydia_right.png");
    resourcePreLoader.AddImage("img/game_notify_item_left.png");
    resourcePreLoader.AddImage("img/game_notify_item_right.png");
    resourcePreLoader.AddImage("img/game_notify_ward_left.png");
    resourcePreLoader.AddImage("img/game_notify_ward_right.png");
    resourcePreLoader.AddImage("img/game_notify_ward_left_beat.png");
    resourcePreLoader.AddImage("img/game_notify_ward_right_beat.png");
    
    //게임 UI 이미지
    resourcePreLoader.AddImage("img/game_UI_leftbutton.png");
    resourcePreLoader.AddImage("img/game_UI_leftbutton_down.png");
    resourcePreLoader.AddImage("img/game_UI_rightbutton.png");
    resourcePreLoader.AddImage("img/game_UI_rightbutton_down.png");
    resourcePreLoader.AddImage("img/game_UI_total.png");
    resourcePreLoader.AddImage("img/game_UI_totalupper.png");
    resourcePreLoader.AddImage("img/game_UI_player_hp.png");
    resourcePreLoader.AddImage("img/game_UI_ward_hp.png");
    resourcePreLoader.AddImage("img/game_UI_exp_gauge.png");
    
    
    resourcePreLoader.AddImage("img/game_over.png");
    resourcePreLoader.AddImage("img/game_over_scroll_upper.png");
    resourcePreLoader.AddImage("img/game_over_scroll_lower.png");
    resourcePreLoader.AddImage("img/game_over_scroll_button.png");
    resourcePreLoader.AddImage("img/game_over_scroll_button_down.png");
    
    soundSystem.AddSound("sound/bgm_ready.mp3", 1);
    soundSystem.AddSound("sound/bgm_play.mp3", 1);
    soundSystem.AddSound("sound/menuclick.mp3", 1);
    soundSystem.AddSound("sound/attack.mp3", 8);
    soundSystem.AddSound("sound/flame.mp3", 8);
    soundSystem.AddSound("sound/attacked.mp3", 8);
    soundSystem.AddSound("sound/item_gain.mp3", 3);
    soundSystem.AddSound("sound/item_drop.mp3", 8);
    
    
    // 게임 초기 시작 상태 설정
    after_loading_state = new TitleState(); // 나중에 타이틀 스테이트로 바꿀것
    gameInterval = setInterval( gameLoop, 1000 / GAME_FPS );
}



window.addEventListener("load", onGameInit, false);

